interface thumbailMoverArgs {
  fileMover: (src: string, dst: string) => Promise<void>;
  imageId: string;
  isGood: boolean;
}

export const thumbnailMover = async ({
  fileMover,
  imageId,
  isGood,
}: thumbailMoverArgs) => {
  const sourceImageLocation = `./public/images/backlog/${imageId}`;
  const rating = isGood ? 'good' : 'bad';
  const destinationLocation = `./public/images/${rating}/${imageId}`;

  await fileMover(sourceImageLocation, destinationLocation);
};
