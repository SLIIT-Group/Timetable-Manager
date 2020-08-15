import React from 'react';
import {Container} from "@material-ui/core";
import TagAllocation from "./Panels/TagAllocation";


function TagManager() {
  return (
      <div style={{ textAlign: 'center' }}>
          Tags Manager
          <Container>
              <TagAllocation />
          </Container>
      </div>
  );
}

export default TagManager;
