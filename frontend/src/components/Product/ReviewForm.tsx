/* ReviewForm

Purpose: To display and control the review form.

Usage: 
- Use the styled css-grid components to control what is shown where and based on screen size.
- Use the initial data and errors to define the starting state
- Use the inputs to define what inputs are shown, where, and how they behave
- Use the gridArea property on inputs to define the look & feel

Props: Takes a productId and a callback to execute after submission from its parent.

*/

import React, {
  ChangeEvent,
  SyntheticEvent,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import validator from 'validator';
import styled from 'styled-components';
import { TextField, Rating, Button, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import client from '../../api/client';

// Styles
const SCard = styled.div`
  padding: 10px;
  background-color: #f3f2f7;
  border-radius: 15px;
  height: 100%;
`;

const SDiv = styled.div`
  padding: 10px 5px 10px 5px;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const SGrid = styled.form`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: auto;
  grid-template-areas:
    'comment'
    'name'
    'email'
    'rating'
    'submit';

  @media (min-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    grid-template-areas:
      'comment comment'
      'name email'
      'rating submit';
  }
`;

interface ReviewFormProps extends React.ComponentPropsWithoutRef<'div'> {
  productId: number;
  submitCallback: () => void;
}

// Defines an input field in the form
interface TInput {
  label?: string; // Label to display if any
  placeholder?: string; // Placeholder to display if any
  gridArea?: string; // Position in the css-grid
  alignItems?: string; // Alignment of the field
  render: ({
    value,
    errorMessage,
  }: {
    value: string | number;
    errorMessage?: string;
  }) => void; // Rendering method. In particular defines what element is rendered for this input
  error: (value: string | number) => string; // function testing the value and returning an error message
}

interface TInputChange {
  id: string;
  value: string | number;
}

const ReviewForm = ({ productId, submitCallback }: ReviewFormProps) => {
  const [initial, setInitial] = useState(true); // Boolean to check if any form change has happened yet. Used to ensure no validation is run before some input is made.
  const [submitting, setSubmitting] = useState(false); // True when submitting to server. Used to disable submission button
  const [disabled, setDisabled] = useState(false); // True when there are validation errors. Used to disable submission button

  // Initial data values for each input
  const initialData = useMemo(
    () => ({
      authorName: {
        value: '',
      },
      authorEmail: {
        value: '',
      },
      comment: {
        value: '',
      },
      rating: {
        value: 3,
      },
    }),
    []
  );

  // Initial error messages (usually set to one space at start for formatting purposes)
  const initialErrors = useMemo(
    () => ({
      authorName: {
        errorMessage: ' ',
      },
      authorEmail: {
        errorMessage: ' ',
      },
      comment: {
        errorMessage: ' ',
      },
      rating: {
        errorMessage: ' ',
      },
    }),
    []
  );

  // On input change, update the data state based on passed input id and value
  const handleInputChange: ({ id, value }: TInputChange) => void = useCallback(
    ({ id, value }: TInputChange) => {
      try {
        setInitial(false);
        setData((data) => ({
          ...data,
          [id]: {
            ...data[id],
            value: value,
          },
        }));
      } catch (err) {
        console.error((err as Error).message);
      }
    },
    []
  );

  // List of inputs to represent in the form. Fully abstracted, makes it easy to add, delete, change any input field.
  // Example: Name could be split in firstName and lastName very quickly.
  const inputs: { [key: string]: TInput } = useMemo(
    () => ({
      authorName: {
        label: 'Your name *',
        gridArea: 'name',
        render: ({
          value,
          errorMessage,
        }: {
          value: string | number;
          errorMessage?: string;
        }) => (
          <TextField
            fullWidth
            id='authorName'
            aria-label={'name'}
            inputProps={{ 'data-testid': 'authorName' }}
            aria-required={true}
            value={value}
            error={errorMessage !== ' '}
            helperText={errorMessage}
            placeholder='Tom Riddle'
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange({
                id: 'authorName',
                value: e.currentTarget.value,
              })
            }
          />
        ),
        error: (value: string | number) =>
          value !== '' && value.toString().length >= 3 ? ' ' : 'Compulsory',
      },
      authorEmail: {
        label: 'Your email *',
        gridArea: 'email',
        render: ({
          value,
          errorMessage,
        }: {
          value: string | number;
          errorMessage?: string;
        }) => (
          <TextField
            fullWidth
            id='authorEmail'
            aria-label={'email'}
            inputProps={{ 'data-testid': 'authorEmail' }}
            aria-required={true}
            value={value}
            error={errorMessage !== ' '}
            helperText={errorMessage}
            type='email'
            placeholder='tmriddle@hogwarts.co.uk'
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange({
                id: 'authorEmail',
                value: e.currentTarget.value,
              })
            }
          />
        ),
        error: (value: string | number) =>
          validator.isEmail(value.toString()) ? ' ' : 'Email wrongly formatted',
      },
      comment: {
        label: 'Comment',
        gridArea: 'comment',
        render: ({
          value,
          errorMessage,
        }: {
          value: string | number;
          errorMessage?: string;
        }) => (
          <TextField
            fullWidth
            id='comment'
            aria-label={'comment'}
            inputProps={{ 'data-testid': 'comment' }}
            aria-required={false}
            value={value}
            error={errorMessage !== ' '}
            helperText={errorMessage}
            multiline
            rows={4}
            placeholder='This product is great!'
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange({
                id: 'comment',
                value: e.currentTarget.value,
              })
            }
          />
        ),
        error: (value: string | number) => ' ',
      },
      rating: {
        label: 'Your rating',
        gridArea: 'rating',
        alignItems: 'center',
        render: ({
          value,
        }: {
          value: string | number;
          errorMessage?: string;
        }) => (
          <Rating
            name='rating'
            aria-label={'rating'}
            aria-required={true}
            value={+value}
            placeholder='Your rating'
            onChange={(event: SyntheticEvent, newValue: number | null) => {
              handleInputChange({
                id: 'rating',
                value: newValue || 0,
              });
            }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />
            }
          />
        ),
        error: (value: string | number) => ' ',
      },
    }),
    [handleInputChange]
  );

  // Current data values
  const [data, setData] =
    useState<{
      [key: string]: { value: string | number };
    }>(initialData);

  // Current error messages
  const [errors, setErrors] =
    useState<{
      [key: string]: { errorMessage?: string };
    }>(initialErrors);

  // Handler validating input values based on inputs error test. Updates the errors and disabled based on returned value.
  const handleValidation = useCallback(() => {
    const validation = Object.keys(inputs).reduce((acc, cur) => {
      let test = inputs[cur].error(data[cur].value);
      setErrors((errors) => ({
        ...errors,
        [cur]: {
          errorMessage: (errors[cur].errorMessage = test),
        },
      }));
      return acc && test === ' ';
    }, true);
    setDisabled(!validation);
    return validation;
  }, [inputs, data]);

  // Trigger validation on data change. Skip it if no input done yet.
  useEffect(() => {
    if (!initial) {
      handleValidation();
    }
  }, [initial, handleValidation]);

  // Submit to server the data. First, checks that data passes validation.
  const handleSubmit = useCallback(async () => {
    try {
      setSubmitting(true);
      if (handleValidation()) {
        const response = await client.post(
          `/product/${productId}/review`,
          data
        );
        if (response.status === 200) {
          setData(initialData);
          setErrors(initialErrors);
          submitCallback();
        }
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    } catch (err) {
      console.error((err as Error).message);
    }
  }, [
    productId,
    initialData,
    submitCallback,
    data,
    handleValidation,
    initialErrors,
  ]);

  // Rendering is limited to design, all content management is abstracted away.
  return (
    <SCard>
      <Typography
        variant='h6'
        gutterBottom
        component='div'
        style={{ justifyItems: 'left', paddingTop: '10px' }}
      >
        Submit your review
      </Typography>
      <SGrid>
        {Object.keys(data).map(
          (item, index) =>
            data[item] && (
              <SDiv
                key={index}
                style={{
                  gridArea: inputs[item].gridArea,
                  alignItems: inputs[item]?.alignItems || 'flex-start',
                }}
              >
                {inputs[item]?.label && (
                  <label
                    htmlFor={item}
                    style={{ paddingBottom: '5px', color: 'grey' }}
                  >
                    {inputs[item].label}
                  </label>
                )}
                {inputs[item].render({
                  value: data[item].value,
                  errorMessage: errors[item]?.errorMessage,
                })}
              </SDiv>
            )
        )}
        <SDiv style={{ alignItems: 'center' }}>
          <Button
            type='submit'
            style={{ gridArea: 'submit' }}
            disabled={submitting || disabled}
            onClick={handleSubmit}
            variant='outlined'
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </Button>
        </SDiv>
      </SGrid>
    </SCard>
  );
};

export default ReviewForm;
