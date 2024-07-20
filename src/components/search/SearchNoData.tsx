import { IconNoSearch } from '@/assets/icons'
import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'
import { Text } from '@chakra-ui/react'

interface Props {
  title: string
  content: string
}
export default function SearchNoData({ title, content }: Props) {
  return (
    <>
      <IconNoSearch width={80} height={80} />
      <Text {...fontStyles.semibold_20} color={Colors.new_gray[6]} mt={3}>
        {title}
      </Text>
      <Text {...fontStyles.regular_16} color={Colors.new_gray[6]}>
        {content}
      </Text>
    </>
  )
}
