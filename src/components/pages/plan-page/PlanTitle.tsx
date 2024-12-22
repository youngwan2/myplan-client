import { formatDate } from '../../../utils/formatUtil';

interface PlanTitlePropsType {
  selectedPlanDate?: string;
}

export default function PlanTitle({ selectedPlanDate }: PlanTitlePropsType) {
  return (
    <h2 className="text-4xl text-[#acaaaa] py-5">
      {selectedPlanDate || formatDate(new Date())}
    </h2>
  );
}
