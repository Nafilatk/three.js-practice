import dynamic from "next/dynamic";

const GalaxyScene = dynamic(() => import("../components/Galaxy"), {
  ssr: false,
});

export default function Home() {
  return <GalaxyScene />;
}
