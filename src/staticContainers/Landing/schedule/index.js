import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { NarrowContainer } from "components/NarrowContainer"
import styled from "styled-components"
import { EventList } from "components/EventList"
import groupEventsByDay from "utilities/groupEventsByDay"

const ViewAllLink = styled(Link)`
  height: 54px;
  border: 1px solid #ffffff;
  box-sizing: border-box;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  background: none;
  padding: 0;
  cursor: pointer;
  outline: inherit;

  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 18px;

  text-align: center;
`

const BottomSpacer = styled.div`
  height: 100px;
  width: 100%;
`

export default () => {
  const { scheduleResult, artistsResult } = useStaticQuery(graphql`
    query {
      scheduleResult: allAirtable(
        filter: { table: { eq: "Schedule" } }
        sort: { fields: data___Show_time, order: ASC }
      ) {
        edges {
          node {
            id
            recordId
            data {
              Artist
              Show_time
            }
          }
        }
      }

      artistsResult: allAirtable(filter: { table: { eq: "Artists" } }) {
        edges {
          node {
            recordId
            data {
              # Artist info
              Name
              Genre
              Representation_Name
              Performance_Type
              Audience
              Email
              Phone
              COVID_19
              Bio
              Press_Image {
                id
                thumbnails {
                  large {
                    url
                  }
                }
              }

              # Social
              Soundcloud
              Spotify
              Website
              Facebook
              Online_Store
              Instagram
              Twitter
              Youtube

              # Metadata
              Location
              Past_Gigs
              Notes
            }
          }
        }
      }
    }
  `)

  const events = scheduleResult.edges.map((edge) => edge.node)
  const artists = artistsResult.edges.reduce((acc, curr) => {
    acc[curr.node.recordId] = curr.node
    return acc
  }, {})

  // Only display events that happen on "next" day relative from cutoff
  const nextDaysEvents = groupEventsByDay(events).values().next().value;

  return (
    <NarrowContainer>
      <EventList events={nextDaysEvents} artists={artists} />

      <ViewAllLink to="/schedule">View all</ViewAllLink>
      <BottomSpacer />
    </NarrowContainer>
  )
}
