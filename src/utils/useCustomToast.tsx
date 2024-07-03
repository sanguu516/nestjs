'use client'

import { IconDangerCircle } from '@/assets/icons'
import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'
import { Flex, Text, useToast, type UseToastOptions } from '@chakra-ui/react'
import { useCallback } from 'react'

export default function useCustomToast() {
  const toast = useToast()

  const customToast = useCallback(
    (toastProps: UseToastOptions) => {
      const { title, ...rest } = toastProps

      toast({
        ...rest,
        render: () => {
          if (rest.status === 'error') {
            return (
              <Flex
                align="center"
                mb={2}
                p={4}
                borderRadius="1000px"
                gap={2}
                bgColor={Colors.gray[200]}
              >
                <IconDangerCircle width={24} height={24} color={Colors.red[500]} />
                <Text {...fontStyles.LabelMd} color={Colors.gray[800]}>
                  {title}
                </Text>
              </Flex>
            )
          }

          if (rest.status == 'info') {
            return (
              <Text
                {...fontStyles.LabelMd}
                textAlign="center"
                p={4}
                position="relative"
                bottom={14}
                borderRadius={16}
                background={Colors.gray[600]}
                color={Colors.white}
                opacity={0.8}
              >
                {title}
              </Text>
            )
          }
        },
      })
    },
    [toast]
  )

  return customToast
}
