const Status = {
  none: "none",
  pending: "pending",
  done: "done",
  error: "error",
};

type StatusType = $Keys<typeof Status>;

export default Status;
export type { StatusType };
