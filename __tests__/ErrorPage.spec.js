import React from 'react'
import ErrorPage from '../src/Components/ErrorPage'
import renderer from 'react-test-renderer'

describe('<ErrorPage />', () => {
  it('renders correctly', () => {
    const component = renderer.create(
      <ErrorPage />
    ).toJSON()

    expect(component).toMatchSnapshot()
  })
})
