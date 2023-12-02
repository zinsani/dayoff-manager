export type ItemBase = {
  id: string;
  author: number;
  createdAt: string;
  modifiedAt?: string;
  deletedAt?: string;
};

type AmountItemBase = {
  amount: DayAmount;
};

export const dayAmountOptions = [
  0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 2.25, 2.5, 2.75, 3.0,
] as const;

type DayAmountTuple = typeof dayAmountOptions;
export type DayAmount = DayAmountTuple[number];

export type Dayoff = {
  usedAt: string;
} & AmountItemBase;

export type DayoffItem = Dayoff & ItemBase;

export type ExtraWork = {
  workedAt: string;
  note?: string;
} & AmountItemBase;

export type ExtraWorkItem = ExtraWork & ItemBase;
