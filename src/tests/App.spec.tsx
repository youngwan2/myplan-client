// import '@testing-library/jest-dom';
import {render, screen } from '@testing-library/react'
import App from '../App'



describe('App 컴포넌트', () => {
    test('renders the app component', () => {
        render(<App />)
        const heading = screen.getByRole("heading")
        screen.debug();
        expect(heading).toBeInTheDocument()
    })
})