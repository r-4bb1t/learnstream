export const convertBlockToText = (blocks: any) => {
  return JSON.parse(blocks)
    .filter((block: any) => block.content !== undefined)
    .map((block: any) => block.content)
    .flat()
    .filter((content: any) => content.type === "text")
    .map((content: any) => content.text)
    .join("\n");
};
