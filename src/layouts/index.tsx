import * as React from "react";
import { Outlet } from "react-router-dom";
import { Scrollbar } from "@/components";
import Header from "./Header";
import "@/assets/styles/index.scss";
import Footer from "./Footer";
import useUpdate from "@/hooks/useUpdate";
import useAuth from "@/hooks/useAuth";
import useSequencerInfo from "@/hooks/useSequencerInfo";
import SubHeader from "./SubHeader";



function BasicLayout() {
  const { address } = useAuth(true);
  const { sequencerId, run: updateRun } = useUpdate();
  const { run: sequencerInfoRun } = useSequencerInfo();

  React.useEffect(() => {
    updateRun({ address });
  }, [address]);

  React.useEffect(() => {
    sequencerInfoRun({ sequencerId: sequencerId, self: true });
  }, [sequencerId]);

  return (
    <React.Fragment>
      <Header />
      <SubHeader/>
      <Scrollbar id="vite-content" trackGap={[10, 10, 10, 10]}>
        <main>
          <Outlet />
        </main>
        <Footer />
      </Scrollbar>
    </React.Fragment>
  );
}

export default BasicLayout;
