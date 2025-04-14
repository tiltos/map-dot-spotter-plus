
import { ScrollArea } from "@/components/ui/scroll-area";

const InfoTab = () => {
  return (
    <ScrollArea className="h-full">
      <div className="p-4 text-sm">
        <h3 className="font-bold mb-4 mt-0 pt-0 text-lg">
          About this project
        </h3>
        <p className="mt-4 mb-4">
          Skarnheim is a hobby project created by @tiltos with help from
          Lovable. It is a fictional fantasy setting, inspired by
          pre-viking Scandinavia. It was created for a campaign of the
          tabletop game,{" "}
          <a
            className="underline text-lightsea"
            href="https://modiphius.net/pages/five-leagues-from-the-borderlands"
            target="_BLANK"
          >
            Five Leagues From the Borderlands
          </a>
          .
        </p>
        <p className="mt-4 mb-4">Tools used for creating the map:</p>
        <ol className="list-disc pl-5">
          <li>
            <a
              className="underline text-lightsea"
              href="https://www.youtube.com/watch?v=Wurgiy3P_-w"
              target="_BLANK"
            >
              This tutorial from Kilroy's Kartography
            </a>
          </li>
          <li>
            <a
              className="underline text-lightsea"
              href="https://azgaar.github.io/Fantasy-Map-Generator/"
              target="_BLANK"
            >
              Azgaar fantasy map generator
            </a>{" "}
            to create the landmass shapes, biomes and heightmap
          </li>
          <li>
            <a
              className="underline text-lightsea"
              href="https://quadspinner.com/"
              target="_BLANK"
            >
              Gaea 2
            </a>{" "}
            to create the erosion and texture maps
          </li>
          <li>
            <a
              className="underline text-lightsea"
              href="https://www.blender.org/"
              target="_BLANK"
            >
              Blender
            </a>{" "}
            to add clouds and render the map with global lighting
          </li>
          <li>
            <a
              className="underline text-lightsea"
              href="https://www.photopea.com/"
              target="_BLANK"
            >
              Photopea
            </a>{" "}
            (free browser-based Photoshop clone) to add labeling, grading
            and visual refinement
          </li>
        </ol>
        <p className="mt-4 mb-4">Tools used for creating the website:</p>
        <ol className="list-disc pl-5">
          <li>
            <a
              className="underline text-lightsea"
              href="https://lovable.dev/"
              target="_BLANK"
            >
              Lovable.dev
            </a>{" "}
            to kickstart and accelerate the project (GenAI prototyping
            tool)
          </li>
          <li>
            <a
              className="underline text-lightsea"
              href="https://www.mapeffects.co/viking-effects"
              target="_BLANK"
            >
              Map Effects: Vikings
            </a>{" "}
            for creating map icons
          </li>
        </ol>
        <p className="mt-4 mb-4">
          This project is publicly available on{" "}
          <a
            className="underline text-lightsea"
            href="https://github.com/tiltos/map-dot-spotter-plus"
            target="_BLANK"
          >
            Github
          </a>
          .
        </p>
      </div>
    </ScrollArea>
  );
};

export default InfoTab;
