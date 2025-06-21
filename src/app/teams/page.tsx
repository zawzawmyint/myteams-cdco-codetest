import PageTopSection from "@/components/generic/PageTopSection";
import BaseContainer from "@/components/global/BaseContainer";
import Teams from "@/components/teams/Teams";

export default function Page() {
  return (
    <BaseContainer>
      <PageTopSection />
      <Teams />
    </BaseContainer>
  );
}
