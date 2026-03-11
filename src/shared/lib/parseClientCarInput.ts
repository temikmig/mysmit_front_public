export interface ParsedClientCarInput {
  mark: string;
  model: string;
}

export const parseClientCarInput = (value: string): ParsedClientCarInput => {
  const parts = value.trim().split(/\s+/);

  let mark = "";
  let model = "";

  if (parts.length === 0) {
    return { mark, model };
  }

  mark = parts[0];

  if (parts.length >= 2) {
    model = parts[1];
  }

  return { mark, model };
};
