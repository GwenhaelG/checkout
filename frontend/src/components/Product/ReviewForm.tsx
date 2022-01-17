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

const SCard = styled.div`
  padding: 10px;
  background-color: #f3f2f7;
  border-radius: 15px;
  height: 100%;
`;

const SDiv = styled.div`
  padding: 10px 5px 10px 5px;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const SGrid = styled.div`
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

interface TInput {
  label?: string;
  placeholder?: string;
  gridArea?: string;
  render: ({
    value,
    errorMessage,
  }: {
    value: string | number;
    errorMessage?: string;
  }) => void;
  error: (value: string | number) => string;
}

interface TInputChange {
  id: string;
  value: string | number;
}

const ReviewForm = ({ productId, submitCallback }: ReviewFormProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const initialData = useMemo(
    () => ({
      authorName: {
        value: '',
        errorMessage: ' ',
      },
      authorEmail: {
        value: '',
        errorMessage: ' ',
      },
      comment: {
        value: '',
        errorMessage: ' ',
      },
      rating: {
        value: 3,
        errorMessage: ' ',
      },
    }),
    []
  );

  const handleInputChange: ({ id, value }: TInputChange) => void = useCallback(
    ({ id, value }: TInputChange) => {
      try {
        setData((data) => ({
          ...data,
          [id]: {
            ...data[id],
            value: value,
            errorMessage: inputs[id].error(value),
          },
        }));
      } catch (err) {
        console.error((err as Error).message);
      }
    },
    []
  );

  const inputs: { [key: string]: TInput } = useMemo(
    () => ({
      authorName: {
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
            value={value}
            error={errorMessage !== ' '}
            helperText={errorMessage}
            placeholder='Your name *'
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
            value={value}
            error={errorMessage !== ' '}
            helperText={errorMessage}
            type='email'
            placeholder='Your email *'
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
            value={value}
            error={errorMessage !== ' '}
            helperText={errorMessage}
            multiline
            rows={4}
            placeholder='Your comment'
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
        render: ({
          value,
        }: {
          value: string | number;
          errorMessage?: string;
        }) => (
          <Rating
            name='hover-feeedback'
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

  const [data, setData] =
    useState<{
      [key: string]: { value: string | number; errorMessage?: string };
    }>(initialData);

  const handleValidation = useCallback(() => {
    return Object.keys(inputs).reduce((acc, cur) => {
      let test = inputs[cur].error(data[cur].value);
      setData({
        ...data,
        [cur]: { ...data[cur], errorMessage: (data[cur].errorMessage = test) },
      });
      return acc && test === ' ';
    }, true);
  }, [inputs, data]);

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
          submitCallback();
        }
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    } catch (err) {
      console.error((err as Error).message);
    }
  }, [productId, initialData, submitCallback, data, handleValidation]);

  // console.log(data);

  useEffect(() => {
    const test = Object.keys(inputs).reduce(
      (acc, cur) => acc && inputs[cur].error(data[cur].value) === ' ',
      true
    );
    setDisabled(!test);
  }, [inputs, data]);

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
              <SDiv key={index} style={{ gridArea: inputs[item].gridArea }}>
                {inputs[item]?.label && (
                  <label htmlFor={item} style={{ paddingRight: '5px' }}>
                    {inputs[item].label}
                  </label>
                )}
                {inputs[item].render({
                  value: data[item].value,
                  errorMessage: data[item]?.errorMessage,
                })}
              </SDiv>
            )
        )}
        <SDiv>
          <Button
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
