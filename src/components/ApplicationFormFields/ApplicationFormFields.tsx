import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { STATUS_OPTIONS } from '../../lib/constants';
import type { IApplicationFormData } from '../../types';
import { FormInput, FormSelect, FormTextarea } from '../common';

interface IApplicationFormFieldsProps {
  register: UseFormRegister<IApplicationFormData>;
  errors: FieldErrors<IApplicationFormData>;
}

const ApplicationFormFields = ({
  register,
  errors,
}: IApplicationFormFieldsProps) => {
  return (
    <>
      <FormInput
        label="Company"
        id="company"
        placeholder="e.g. Google"
        required
        registration={register('company', {
          required: 'Company name is required',
        })}
        error={errors.company}
      />

      <FormInput
        label="Position"
        id="position"
        placeholder="e.g. Frontend Developer"
        required
        registration={register('position', {
          required: 'Position is required',
        })}
        error={errors.position}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormSelect
          label="Status"
          id="status"
          options={STATUS_OPTIONS}
          registration={register('status')}
        />
        <FormInput
          label="Applied Date"
          id="applied_date"
          type="date"
          registration={register('applied_date')}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormInput
          label="Job URL"
          id="url"
          type="url"
          placeholder="https://..."
          registration={register('url')}
        />
        <FormInput
          label="Location"
          id="location"
          placeholder="e.g. Remote, San Francisco, CA"
          registration={register('location')}
        />
      </div>

      <FormInput
        label="Salary"
        id="salary"
        placeholder="e.g. $120,000 - $150,000"
        registration={register('salary')}
      />

      <FormTextarea
        label="Notes"
        id="notes"
        placeholder="Any notes about this application..."
        registration={register('notes')}
      />
    </>
  );
};

export default ApplicationFormFields;
