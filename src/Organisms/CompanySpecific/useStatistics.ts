import { api } from "~/utils/api";

function useStatistics() {
  const { mutateAsync: updateStatistics } =
    api.statistics.updateBusinessStatistics.useMutation();
  return { updateStatistics };
}

export default useStatistics;
