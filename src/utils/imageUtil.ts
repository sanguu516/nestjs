const dummyImageCount = 9

export function getDummyAgencyImage(id: number) {
  const dummyId = id % dummyImageCount

  return `/images/dummy-agency-${dummyId}.jpg`
}
