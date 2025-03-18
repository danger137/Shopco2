import { gql } from "@apollo/client";

// export const GET_FEATURES = gql`
//   query GetFeatures {
//     featuresCollection {
//       items {
//         title
//         description
//         emoji
//       }
//     }
//   }
// `;


export const GET_FEATURES = gql`
  query GetFeatures {
    tagsCollection {
      items {
        tags
      }
    }
  }
`;


export const GET_Description = gql`
  query GetDescription {
    footerDescriptionCollection {
      items {
      description
        description2
      }
    }
  }
`;
export const GET_MAINPAGE = gql`
  query GetMainPage {
    mainPageCollection {
      items {
    title
    description
      }
    }
  }
`;
export const GET_Reviews = gql`
  query GetReviews {
    reviewsCollection {
      items {
    id
    user
    content
    rating
    date
      }
    }
  }
`;


export const GET_BLOG = gql`
 query GetBlog {
  blogSectionCollection {
    items {
      sys {
        id
      }
      title
      description
      image {
        url
      }
    }
  }
}

`;



