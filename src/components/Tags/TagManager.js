import React from 'react';
import {Container} from "@material-ui/core";
import TagAllocation from "./Panels/TagAllocation";
import NewTagAllocation from "./Panels/NewTagAllocation";

function TagManager() {
  return (
      <div style={{ textAlign: 'center' }}>
          Tags Manager
          <Container>
              <NewTagAllocation />
              <TagAllocation />
          </Container>
      </div>
  );
}

export default TagManager;
