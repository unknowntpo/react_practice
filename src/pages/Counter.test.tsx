/// <reference types="vitest-dom/extend-expect" />
import { render, screen } from '@testing-library/react'
import Counter from './Counter'
import { describe, expect, it } from 'vitest'

// Clean up WebSocket mock after each test

describe('Counter', () => {
  it('renders the Counter component', () => {
    render(<Counter />)
		expect(screen.getByText(/Count: 0/)).toBeInTheDocument();
  })
})
