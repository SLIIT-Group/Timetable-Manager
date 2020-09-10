import React from 'react';
import {Container} from "@material-ui/core";
import TagDetails from "./Panels/TagDetails";
import NewTagAllocation from "./Panels/NewTagAllocation";
import NewTagEntry from "./Panels/NewTagEntry";

function TagManager() {
  return (
      <div style={{ textAlign: 'center' }}>
          Tags Manager
          <Container>
              <NewTagAllocation />
              <TagDetails />
              <NewTagEntry />
          </Container>
      </div>
  );
}

export default TagManager;
