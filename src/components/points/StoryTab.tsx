
import { ScrollArea } from "@/components/ui/scroll-area";

const StoryTab = () => {
  return (
    <ScrollArea className="h-full">
      <div className="p-4 text-sm">
        <h3 className="font-bold mb-4 mt-0 pt-0 text-lg">
          The Campaign
        </h3>
        <blockquote className="mt-2 text-xs text-muted-foreground pl-5 pr-2 py-1 border-l-2 border-primary/40">
          In the village of Eidrholt, sheep are found gutted in the
          frost, their tongues cut out. One of the local herdsmen swears
          he saw a figure walking on the snow without leaving prints.
          The elders whisper of the Vargrkind, old spirits in wolf form
          who return when oaths are broken.
          <br />
          <br />
          Yrsa has seen them in her dreams — antlered things of bone and
          mist. A cairn lies in the forest north of here, said to be
          sealed with song-runes only a Dream-Singer can break…
        </blockquote>
        <p className="mt-4 mb-4">
          This campaign follows the story of the Thornborn Kin.
        </p>
        <p className="mt-4 mb-4">
          <em>
            The name <strong>Thornborn Kin</strong> is not a boast, nor
            a banner to rally armies. It's a memory. A scar. A choice.
            They became kin not by birth, but by suffering.
          </em>
        </p>
        <p className="mt-4 mb-4">
          <em>
            They wear no crest, only a braid of thorn-twine around the
            hilt or haft of their weapons — some say it hurts to grip,
            and that's the point.
          </em>
        </p>
        <ul>
          <li className="mt-2 mb-2">
            <strong>Thoren Alvsson</strong><br />
            <em>
              Once heir to a fallen thanehold drowned in debt and fire,
              Thoren now leads with wounded pride. His blade,
              'Mourngleam,' is heirloom steel tarnished by betrayal.
            </em>
          </li>
          <li className="mt-2 mb-2">
            <strong>Yrsa Dream-Singer</strong><br />
            <em>
              Born in a thunderstorm, her mother struck dead as she
              screamed her first breath. Raised by spirit-singers, she
              walks between worlds, speaking to ancestors in ash and
              bone.
            </em>
          </li>
          <li  className="mt-2 mb-2">
            <strong>Halvar the Grey</strong><br />
            <em>
              Born to a weather-worn clan that patrols the forest
              borderlands, Halvar knows the tracks of beasts and bandits
              alike. Few speak as plainly or shoot as cleanly.
            </em>
          </li>
          <li className="mt-2 mb-2">
            <strong>Vael Ashborne</strong><br />
            <em>
              Born to a mortal woman and a forgotten winter spirit, Vael
              is as unreadable as the shifting snow. His eyes glow
              faintly in moonlight, and animals hesitate near him.
            </em>
          </li>
          <li className="mt-2 mb-2">
            <strong>Sten Fenborn</strong><br />
            <em>
              A swamp-born hunter from the ice-fens. Sten never speaks
              of the night his village vanished. He bears a crude
              bear-paw talisman and sees omens in blood patterns.
            </em>
          </li>
          <li className="mt-2 mb-2">
            <strong>Rurik Tallow-Eyes</strong><br />
            <em>
              Pale-eyed and soft-spoken, Rurik arrived from the east,
              barefoot and covered in candle wax. Some say he was a
              grave-candlemaker. Others say he still is.
            </em>
          </li>
        </ul>
        <p className="mt-4 mb-4">
          You can read more about the campaign, the characters,
          locations, and quests on my{" "}
          <a
            className="underline text-lightsea"
            href="https://adjoining-era-77b.notion.site/Five-Leagues-from-the-Borderlands-1d1835c20aa3803db7cef1b1758c256a?pvs=4"
            target="_BLANK"
          >
            Notion page
          </a>
          .
        </p>
      </div>
    </ScrollArea>
  );
};

export default StoryTab;
