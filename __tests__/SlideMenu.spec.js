import React from 'react'
import SlideMenu from '../src/Components/SlideMenu'
import renderer from 'react-test-renderer'

describe('<SlideMenu />', () => {
  let component

  beforeEach(() => {
    component = renderer.create(
      <SlideMenu
        navigation={{
          state: {
            routes: [
              {routeName: 'Standings'},
              {routeName: 'Calendar'}
            ]
          }
        }}
      />
    ).toJSON()
  })

  it('renders correctly', () => {
    expect(component).toMatchSnapshot()
  })
})
