export const GET_CHARACTERS = `
  query {
    characters {
      id
      name
      status
      species
      type
      gender
      origin {
        name
        type
        dimension
      }
      location {
        name
        type
        dimension
      }
      image
      episode {
        id
        name
        air_date
        episode
      }
      created
    }
  }
`;
