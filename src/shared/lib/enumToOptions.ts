interface Option<T> {
  value: T;
  label: string;
}

export function enumToOptions<T extends Record<string, string | number>>(
  obj: T,
  includeNull: true,
  nullLabel?: string,
): Option<keyof T | null>[];

export function enumToOptions<T extends Record<string, string | number>>(
  obj: T,
  includeNull?: false,
  nullLabel?: string,
): Option<keyof T>[];

export function enumToOptions<T extends Record<string, string | number>>(
  obj: T,
  includeNull = false,
  nullLabel = "Отсутствует",
) {
  const options = Object.keys(obj).map((key) => ({
    value: key as keyof T,
    label: obj[key as keyof T] as string,
  }));

  if (includeNull) {
    return [{ value: null, label: nullLabel }, ...options];
  }

  return options;
}
