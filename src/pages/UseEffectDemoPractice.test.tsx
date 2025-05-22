import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import UseEffectDemoPractice from './UseEffectDemoPractice'


describe('UseEffectDemoPractice', () => {
  beforeEach(() => {
		cleanup();
    // Mock global fetch
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
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

		await waitFor(()=> {
			// FIXME: Why fetch has been called three times ?
			expect(fetch).toHaveBeenCalledTimes(3);
			expect(screen.getByText(/John Doe/)).toBeInTheDocument();
		})
	})
})