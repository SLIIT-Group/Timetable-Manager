import React from 'react';
import {Container} from "@material-ui/core";
import TagDetails from "./Panels/TagDetails";
import NewTagEntry from "./Panels/NewTagEntry";

function TagManager() {
  return (
      <div style={{ textAlign: 'center' }}>
          <Container>
              <TagDetails />
              <NewTagEntry />
          </Container>
      </div>
  );
}

export default TagManager;
