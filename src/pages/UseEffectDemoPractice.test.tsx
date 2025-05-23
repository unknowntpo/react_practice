import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import UseEffectDemoPractice from './UseEffectDemoPractice'

const fakeUsers = [
	{
		id: 1,
		name: 'John Doe',
		email: 'johndoe@toy.com',
		company: {name: "Toy Company"}
	},
	{
		id: 2,
		name: 'Emily',
		email: 'emily@google.com',
		company: {name: "Microsoft"}
	},
	{
		id: 3,
		name: 'Dennis',
		email: 'dennis@google.com',
		company: {name: "Google"}
	}
]


describe('UseEffectDemoPractice', () => {
  beforeEach(() => {
		cleanup();
    // Mock global fetch
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
				ok: true,
        json: () =>
          Promise.resolve(fakeUsers),
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
			fakeUsers.forEach(user => expect(screen.getByText(user.name)).toBeInTheDocument());
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