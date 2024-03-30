const dummyImageCount = 18

export function getDummyAgencyImage(id: number) {
  const dummyId = id % dummyImageCount

  return `/images/dummy-agency-${dummyId}.jpg`
}
