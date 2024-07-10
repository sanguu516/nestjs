'use client'

import { IconArrowLeft, IconHeart, IconLocation, IconSend } from '@/assets/icons'
import Chip from '@/components/Chip'
import Button from '@/components/CustomButton'
import IconButton from '@/components/CustomIconButton'
import Input from '@/components/CustomInput'
import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'
import { buttonTheme, type ButtonVariant } from '@/styles/theme/Button'
import { chipTheme, type ChipVariant } from '@/styles/theme/Chip'
import { iconButtonTheme, type IconButtonVariant, type Size } from '@/styles/theme/IconButton'
import { Box, Flex, HStack, Text, Textarea, VStack } from '@chakra-ui/react'

const colorBlocks = Object.entries(Colors)
  .filter(([key]) => key !== 'black' && key !== 'white')
  .map(([hue, value]) => {
    return (
      <Box
        key={hue}
        sx={{
          display: 'flex',
          gap: 1,
        }}
      >
        <Box width="80px">{hue}</Box>
        {Object.entries(value).map(([name, color]) => (
          <Box
            key={color}
            sx={{
              width: 50,
              height: 30,
              bg: color,
              color: Number(name) > 500 ? 'white' : 'black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {name}
          </Box>
        ))}
      </Box>
    )
  })

const buttonBlocks = Object.keys(buttonTheme.sizes!).map((size) => {
  return (
    <Box key={size} gap={3}>
      {Object.keys(buttonTheme.variants!).map((variant) => {
        const s = size as Size
        const v = variant as ButtonVariant
        return (
          <Flex key={`${size}+${variant}`} gap={5}>
            <Flex gap={3} my={3}>
              <Button size={s} variant={v}>
                Label
              </Button>
              <Button size={s} variant={v} isDisabled>
                Label
              </Button>
            </Flex>
            <Flex gap={3} my={3}>
              <Button icon={<IconSend />} size={s} variant={v}>
                Label
              </Button>
              <Button icon={<IconSend />} size={s} variant={v} isDisabled>
                Label
              </Button>
            </Flex>
          </Flex>
        )
      })}
    </Box>
  )
})

const iconButtonBlocks = Object.keys(iconButtonTheme.variants).map((variant) => {
  return (
    <Box key={variant} gap={3}>
      {Object.keys(iconButtonTheme.sizes).map((size) => {
        const v = variant as IconButtonVariant
        const s = size as Size
        return (
          <Flex key={`${size}+${variant}`} gap={5} my={3}>
            {v === 'floating' && (
              <IconButton size={s} variant={v} aria-label="location-icon" icon={<IconLocation />} />
            )}
            <IconButton
              size={s}
              variant={v}
              aria-label="location-icon"
              icon={<IconLocation />}
              isDisabled
            />
          </Flex>
        )
      })}
    </Box>
  )
})

const chipBlocks = Object.keys(chipTheme.variants).map((variant) => {
  const v = variant as ChipVariant
  return (
    <Box key={variant} gap={3}>
      <Flex gap={5}>
        <Flex gap={3} my={3}>
          <Chip size="sm" variant={v}>
            Label
          </Chip>
          <Chip size="sm" variant={v}>
            Label
          </Chip>
        </Flex>
        <Flex gap={3} my={3}>
          <Chip size="lg" icon={<IconSend />} variant={v}>
            Label
          </Chip>
          <Chip size="lg" icon={<IconSend />} variant={v}>
            Label
          </Chip>
        </Flex>
      </Flex>
    </Box>
  )
})

export default function UISamples() {
  return (
    <VStack gap={3} h="fit-content">
      {colorBlocks}
      <HStack gap={2}>
        <Text sx={{ ...fontStyles.BodyLg }}>IconTest</Text>
        <IconArrowLeft width={24} height={24} />
        <IconHeart width={32} height={32} color={Colors.red[500]} />
      </HStack>
      <Flex gap={10}>{buttonBlocks}</Flex>
      <Flex gap={10}>{iconButtonBlocks}</Flex>
      {chipBlocks}
      <Textarea
        defaultValue={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in ex eleifend, faucibus libero ac, lobortis leo.'
        }
      ></Textarea>
      <Button size="lg" variant="filled">
        ??
      </Button>
      <Input type="text" placeholder="Label" />
      <Input type="text" placeholder="Label" isDisabled />
      <Input
        type="password"
        placeholder="Label"
        supportingText="8자 이상 입력해주세요."
        isSensitive
      />
      <Input type="text" placeholder="Label" defaultValue="Label" isInvalid />
    </VStack>
  )
}
