import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import UseEffectDemoPractice from './UseEffectDemoPractice'


describe('UseEffectDemoPractice', () => {
  beforeEach(() => {
		cleanup();
    // Mock global fetch
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
				ok: true,
        json: () =>
          Promise.resolve({
            id: 1,
            name: 'John Doe',
						company: {name: "Toy Company"}
          }),
      })
    ));
  });
	it('display hello message', () => {
		render(<UseEffectDemoPractice />)
		expect(screen.getByText(/Hello from UseEffectDemoPractice/)).toBeInTheDocument();
	})

	it('display hello message', () => {
		render(<UseEffectDemoPractice />)
		expect(screen.getByText(/Hello from UseEffectDemoPractice/)).toBeInTheDocument();
	})


	it('fetch data when I click refresh', async () => {
		render(<UseEffectDemoPractice />)
		expect(screen.getByText(/Hello from UseEffectDemoPractice/)).toBeInTheDocument();

		fireEvent.click(screen.getByTestId('refresh-button'));

		// make sure Loading data information is present.
		expect(screen.getByTestId('users-container').innerHTML).toMatch(/Loading data/);

		await waitFor(()=> {
			// FIXME: Why fetch has been called three times ?
			expect(fetch).toHaveBeenCalledTimes(1);
			expect(screen.getByText(/John Doe/)).toBeInTheDocument();
		})
	})

	describe('fetch data failed when I click refresh', async () => {
		it('shows error message', async () => {
			// stimulate error comes from 'fetch'
			vi.stubGlobal('fetch', vi.fn(()=> Promise.reject(new Error('Failed to fetch'))));

			render(<UseEffectDemoPractice />)
			expect(screen.getByText(/Hello from UseEffectDemoPractice/)).toBeInTheDocument();

			fireEvent.click(screen.getByTestId('refresh-button'));

			// make sure Loading data information is present.
			expect(screen.getByTestId('users-container').innerHTML).toMatch(/Loading data/);

			await waitFor(()=> {
				// FIXME: Why fetch has been called three times ?
				expect(fetch).toHaveBeenCalled();
				expect(screen.getByText(/Failed to fetch user data/)).toBeInTheDocument();
			})
		})
	})
})