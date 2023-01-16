import DefaultResponse from '@/core/types/DefaultResponse';
import ConditionTableRow from './ConditionTableRow';

type AddConditionResponse = DefaultResponse & {
  result: ConditionTableRow;
};

export default AddConditionResponse;
