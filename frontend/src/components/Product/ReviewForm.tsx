import React, {
  ChangeEvent,
  SyntheticEvent,
  useState,
  useCallback,
  useMemo,
} from 'react';
import styled from 'styled-components';
import { TextField, Rating, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import client from '../../api/client';

const SDiv = styled.div`
  margin: 10px;
  padding: 10px 5px 10px 5px;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const SGrid = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  grid-template-areas:
    'comment comment'
    'name email'
    'rating submit';
`;

interface ReviewFormProps extends React.ComponentPropsWithoutRef<'div'> {
  productId: number;
  submitCallback: () => void;
}

interface TInput {
  label?: string;
  placeholder?: string;
  render: (value: string | number) => void;
}

interface TInputChange {
  id: string;
  value: string | number;
}

const ReviewForm = ({ productId, submitCallback }: ReviewFormProps) => {
  const [submitting, setSubmitting] = useState(false);

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
        value: 0,
      },
    }),
    []
  );

  const handleInputChange: ({ id, value }: TInputChange) => void = useCallback(
    ({ id, value }: TInputChange) => {
      try {
        setData((data) => ({
          ...data,
          [id]: { ...data[id], value: value },
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
        render: (value: string | number) => (
          <TextField
            fullWidth
            style={{ gridArea: 'name' }}
            value={value}
            placeholder='Your name'
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange({
                id: 'authorName',
                value: e.currentTarget.value,
              })
            }
          />
        ),
      },
      authorEmail: {
        render: (value: string | number) => (
          <TextField
            fullWidth
            style={{ gridArea: 'email' }}
            value={value}
            type='email'
            placeholder='Your email'
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange({
                id: 'authorEmail',
                value: e.currentTarget.value,
              })
            }
          />
        ),
      },
      comment: {
        render: (value: string | number) => (
          <TextField
            fullWidth
            style={{ gridArea: 'comment' }}
            value={value}
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
      },
      rating: {
        label: 'Your rating',
        render: (value: string | number) => (
          <Rating
            style={{ gridArea: 'rating' }}
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
      },
    }),
    [handleInputChange]
  );

  const [data, setData] =
    useState<{ [key: string]: { value: string | number } }>(initialData);

  const handleSubmit = useCallback(async () => {
    try {
      setSubmitting(true);
      const response = await client.post(`/product/${productId}/review`, data);
      if (response.status === 200) {
        setData(initialData);
        submitCallback();
      }
      setSubmitting(false);
    } catch (err) {
      console.error((err as Error).message);
    }
  }, [productId, initialData, submitCallback, data]);

  return (
    <SGrid>
      {Object.keys(data).map(
        (item, index) =>
          data[item] && (
            <SDiv key={index}>
              {inputs[item]?.label && (
                <label htmlFor={item} style={{ paddingRight: '5px' }}>
                  {inputs[item].label}
                </label>
              )}
              {inputs[item].render(data[item].value)}
            </SDiv>
          )
      )}
      <Button
        style={{ gridArea: 'submit' }}
        disabled={submitting}
        onClick={handleSubmit}
        variant='outlined'
      >
        {submitting ? 'Submitting...' : 'Submit'}
      </Button>
    </SGrid>
  );
};

export default ReviewForm;
