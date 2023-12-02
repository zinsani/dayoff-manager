import { defineStore } from 'pinia';
import { date, uid } from 'quasar';
import { Dayoff, DayoffItem, ExtraWork, ExtraWorkItem } from './model';

type State = {
  usedItems: {
    total: number;
    rows: DayoffItem[];
  };
  extraWorkItems: {
    total: number;
    rows: ExtraWorkItem[];
  };
  totalAmount: number;
  projectStartedAt: Date;
};

export const useDayoffStore = defineStore('dayoff', {
  state: (): State => ({
    usedItems: {
      total: 0,
      rows: [],
    },
    extraWorkItems: {
      total: 0,
      rows: [],
    },
    totalAmount: 0,
    projectStartedAt: new Date(),
  }),
  getters: {
    usedAmount(state) {
      return state.usedItems.rows.reduce(
        (total, { amount }) => total + amount,
        0
      );
    },
    availableAmount(state) {
      return (
        state.totalAmount -
        state.usedItems.rows.reduce((total, { amount }) => total + amount, 0)
      );
    },
  },
  actions: {
    updateMonthlyTotal(projectStartedAt: Date) {
      this.projectStartedAt = projectStartedAt;
      const today = new Date();
      this.totalAmount =
        date.getDateDiff(today, projectStartedAt, 'months') +
        this.extraWorkItems.total;
      console.log('updateMonthlyTotal:', this.totalAmount);
    },
    addUsedItem(payload: Dayoff) {
      this.usedItems.rows.push({
        ...payload,
        id: uid(),
        createdAt: new Date(),
        author: 0,
      });
      this.usedItems.total = this.usedItems.rows.length;
    },
    addExtraWorkItem(payload: ExtraWork) {
      this.extraWorkItems.rows.push({
        ...payload,
        id: uid(),
        createdAt: new Date(),
        author: 0,
      });

      this.extraWorkItems.total = this.extraWorkItems.rows.length;
    },
  },
  persist: { enabled: true },
});
