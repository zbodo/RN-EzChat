// Holiday data from NateScarlet/holiday-cn (MIT License)
// https://github.com/NateScarlet/holiday-cn

import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

const MIRRORS = [
  'https://raw.githubusercontent.com/NateScarlet/holiday-cn/master/{year}.json',
  'https://cdn.jsdelivr.net/gh/NateScarlet/holiday-cn@master/{year}.json',
  'https://fastly.jsdelivr.net/gh/NateScarlet/holiday-cn@master/{year}.json',
];

const LOOK_AHEAD_DAYS = 60;
const LOOK_BEHIND_DAYS = 60;

type HolidayDay = {
  date: string;
  isOffDay: boolean;
  name?: string;
};

type YearData = {
  days: HolidayDay[];
};

type HolidayInfo = {
  isOffDay: boolean;
  name: string;
};

type HolidayMap = Record<string, HolidayInfo>;

type CountdownResult = {
  distance: number;
  name: string;
  percent: number;
};

type Props = {
  textColor: string;
  cardBackground: string;
};

const dataCache: Record<number, YearData | null> = {};

async function fetchYearData(year: number): Promise<YearData | null> {
  if (dataCache[year] !== undefined) {
    return dataCache[year];
  }
  for (const mirror of MIRRORS) {
    try {
      const url = mirror.replace('{year}', String(year));
      const resp = await fetch(url, {headers: {'Cache-Control': 'no-cache'}});
      if (!resp.ok) {
        continue;
      }
      const data: YearData = await resp.json();
      if (data?.days?.length) {
        dataCache[year] = data;
        return data;
      }
    } catch {
      // try next mirror
    }
  }
  dataCache[year] = null;
  return null;
}

function toDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function isWeekend(d: Date): boolean {
  return d.getDay() === 0 || d.getDay() === 6;
}

function buildHolidayMap(yearDataMap: Record<number, YearData | null>): HolidayMap {
  const map: HolidayMap = {};
  for (const data of Object.values(yearDataMap)) {
    if (!data?.days) {
      continue;
    }
    for (const item of data.days) {
      map[item.date] = {
        isOffDay: item.isOffDay,
        name: item.name || '周末',
      };
    }
  }
  return map;
}

function isRestDay(d: Date, map: HolidayMap): boolean {
  const info = map[toDateStr(d)];
  if (info !== undefined) {
    return info.isOffDay;
  }
  return isWeekend(d);
}

function restDayName(d: Date, map: HolidayMap): string {
  const info = map[toDateStr(d)];
  if (info?.isOffDay) {
    return info.name || '周末';
  }
  return '周末';
}

function computeCountdown(today: Date, map: HolidayMap): CountdownResult {
  if (isRestDay(today, map)) {
    return {distance: 0, name: restDayName(today, map), percent: 100};
  }

  for (let i = 1; i <= LOOK_AHEAD_DAYS; i++) {
    const future = addDays(today, i);
    if (isRestDay(future, map)) {
      let pastWorkDays = 0;
      for (let j = 1; j < LOOK_BEHIND_DAYS; j++) {
        const prev = addDays(today, -j);
        if (isRestDay(prev, map)) {
          break;
        }
        pastWorkDays++;
      }
      const total = pastWorkDays + i;
      const pct = total > 0 ? Math.round(((total - i) * 100) / total) : 0;
      return {distance: i, name: restDayName(future, map), percent: pct};
    }
  }

  return {distance: -1, name: '周末', percent: 0};
}

const BAR_SEGMENTS = 20;

function ProgressBar({percent, color}: {percent: number; color: string}) {
  const filled = Math.round((percent * BAR_SEGMENTS) / 100);
  const empty = BAR_SEGMENTS - filled;
  const bar = '█'.repeat(filled) + '░'.repeat(empty);
  return (
    <Text style={[styles.progressText, {color}]}>
      {bar} {percent}%
    </Text>
  );
}

const HolidayCountdown = ({textColor, cardBackground}: Props) => {
  const [result, setResult] = useState<CountdownResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const today = new Date();
      const start = addDays(today, -LOOK_BEHIND_DAYS);
      const end = addDays(today, LOOK_AHEAD_DAYS);
      const years = new Set<number>();
      for (let y = start.getFullYear(); y <= end.getFullYear(); y++) {
        years.add(y);
      }

      const yearDataMap: Record<number, YearData | null> = {};
      await Promise.all(
        [...years].map(async y => {
          yearDataMap[y] = await fetchYearData(y);
        }),
      );

      if (cancelled) {
        return;
      }

      const map = buildHolidayMap(yearDataMap);
      setResult(computeCountdown(today, map));
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <View style={[styles.card, {backgroundColor: cardBackground}]}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!result || result.distance < 0) {
    return null;
  }

  const isToday = result.distance === 0;

  return (
    <View style={[styles.card, {backgroundColor: cardBackground}]}>
      <Text style={[styles.emoji]}>
        {isToday ? '🎉' : '🏖️'}
      </Text>
      <Text style={[styles.title, {color: textColor}]}>
        {isToday
          ? `今天是${result.name}，好好休息！`
          : `距 ${result.name} 还有 ${result.distance} 天`}
      </Text>
      {!isToday && <ProgressBar percent={result.percent} color={textColor} />}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    gap: 6,
  },
  emoji: {
    fontSize: 28,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Menlo',
    letterSpacing: 1,
  },
});

export default HolidayCountdown;
