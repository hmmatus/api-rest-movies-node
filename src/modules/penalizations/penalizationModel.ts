export interface PenalizationI {
  id?: string;
  reason: PenalizationReasonEnum;
  idTransaction: string;
  amount: number;
  status: PenalizationStatusEnum;
}

enum PenalizationReasonEnum {
  LATE_RETURN = "late_return",
  DAMAGE = "damage",
  LOST = "lost",
}

enum PenalizationStatusEnum {
  PENDING = "pending",
  PAID = "paid",
  CANCELED = "canceled",
}
