import { render, screen } from '@testing-library/react'
import { mocked } from 'jest-mock'
import Home, { getStaticProps } from '../../pages'
import { stripe } from '../../services/stripe'

jest.mock('next/router')
jest.mock('next-auth/client', () => {
  return {
    useSession: () => [null, false]
  }
})
jest.mock('../../services/stripe')

describe('Home page', () => {
  it('renders correctly', () => {
    render(<Home product={{ priceId: 'fake-price-id', amount: 'R$10,00' }}/>)

    expect(screen.getByText("for R$10,00 month")).toBeInTheDocument()
  });

  it('loads initial data', async () => {
    const retrivesStripePricesMocked = mocked(stripe.prices.retrieve)

    retrivesStripePricesMocked.mockResolvedValueOnce({
      id: 'fake-price-id',
      unit_amount: 1000
    } as any)

    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            amount: '$10.00',
            priceId: 'fake-price-id',
          },
        },
        revalidate: 86400,
      })
    );
  })
})