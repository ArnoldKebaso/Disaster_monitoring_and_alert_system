'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// MUI Imports
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import type { Theme } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import type { Mode } from '@core/types'

// Component Imports
import CustomIconButton from '@core/components/mui/IconButton'
import ModeDropdown from '@components/layout/shared/ModeDropdown'

// Util Imports
import { frontLayoutClasses } from '@layouts/utils/layoutClasses'

// Styles Imports
import styles from './styles.module.css'

// Define navigation structure for disaster alert system
interface NavItem {
  title: string
  href?: string
  icon?: string
  children?: NavItem[]
  chip?: string
  external?: boolean
}

const navigationItems: NavItem[] = [
  {
    title: 'Home',
    href: '/front-pages/landing-page'
  },
  {
    title: 'About Us',
    href: '/front-pages/about'
  },
  {
    title: 'Get Involved',
    icon: 'ri-heart-pulse-line',
    children: [
      {
        title: 'Donate',
        href: '/front-pages/donate',
        icon: 'ri-heart-line'
      },
      {
        title: 'Volunteer',
        href: '/front-pages/volunteer',
        icon: 'ri-user-heart-line'
      }
    ]
  },
  {
    title: 'Resources',
    href: '/front-pages/resources'
  },
  {
    title: 'Emergency Info',
    href: '/front-pages/emergency-info'
  },
  {
    title: 'Contact',
    href: '/front-pages/contact'
  },
  {
    title: 'FAQ',
    href: '/front-pages/faq'
  }
]

const DisasterAlertHeader = ({ mode }: { mode: Mode }) => {
  // States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [mobileOpenSubmenu, setMobileOpenSubmenu] = useState<string | null>(null)

  // Hooks
  const pathname = usePathname()
  const isBelowLgScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  // Detect window scroll
  const trigger = useScrollTrigger({
    threshold: 0,
    disableHysteresis: true
  })

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, menuId: string) => {
    setAnchorEl(event.currentTarget)
    setOpenSubmenu(menuId)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setOpenSubmenu(null)
  }

  const toggleMobileSubmenu = (menuId: string) => {
    setMobileOpenSubmenu(mobileOpenSubmenu === menuId ? null : menuId)
  }

  const isActiveLink = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  const renderDesktopMenu = () => (
    <div className='hidden lg:flex items-center gap-6'>
      {navigationItems.map((item, index) => {
        if (item.children) {
          return (
            <div key={index} className='relative'>
              <Button
                onMouseEnter={(e) => handleMenuOpen(e, item.title)}
                sx={{
                  color: 'white',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
                endIcon={<i className='ri-arrow-down-s-line' />}
              >
                {item.title}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={openSubmenu === item.title}
                onClose={handleMenuClose}
                MenuListProps={{
                  onMouseLeave: handleMenuClose
                }}
                sx={{
                  '& .MuiPaper-root': {
                    mt: 1,
                    minWidth: 200
                  }
                }}
              >
                {item.children.map((child, childIndex) => (
                  <MenuItem
                    key={childIndex}
                    component={Link}
                    href={child.href || '#'}
                    onClick={handleMenuClose}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(33, 150, 243, 0.1)'
                      }
                    }}
                  >
                    {child.icon && <i className={`${child.icon} mr-2`} />}
                    {child.title}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          )
        }

        return (
          <Button
            key={index}
            component={Link}
            href={item.href || '#'}
            sx={{
              color: isActiveLink(item.href || '') ? '#00E5FF' : 'white',
              fontWeight: isActiveLink(item.href || '') ? 600 : 500,
              borderBottom: isActiveLink(item.href || '') ? '2px solid #00E5FF' : 'none',
              borderRadius: 0,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            {item.title}
          </Button>
        )
      })}
    </div>
  )

  const renderMobileDrawer = () => (
    <Drawer
      anchor='left'
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
      sx={{
        '& .MuiDrawer-paper': {
          width: 280,
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          color: 'white'
        }
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <i className='ri-shield-check-line text-2xl text-cyan-400' />
          <Typography variant='h6' sx={{ fontWeight: 'bold', color: 'white' }}>
            Disaster Alert System
          </Typography>
        </Box>
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', mb: 2 }} />

        <List>
          {navigationItems.map((item, index) => {
            if (item.children) {
              return (
                <div key={index}>
                  <ListItemButton
                    onClick={() => toggleMobileSubmenu(item.title)}
                    sx={{
                      borderRadius: 1,
                      mb: 1,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                      }
                    }}
                  >
                    {item.icon && (
                      <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                        <i className={item.icon} />
                      </ListItemIcon>
                    )}
                    <ListItemText primary={item.title} />
                    <i className={`ri-arrow-${mobileOpenSubmenu === item.title ? 'up' : 'down'}-s-line`} />
                  </ListItemButton>
                  <Collapse in={mobileOpenSubmenu === item.title} timeout='auto' unmountOnExit>
                    <List component='div' disablePadding>
                      {item.children.map((child, childIndex) => (
                        <ListItemButton
                          key={childIndex}
                          component={Link}
                          href={child.href || '#'}
                          sx={{
                            pl: 4,
                            borderRadius: 1,
                            mb: 0.5,
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.1)'
                            }
                          }}
                          onClick={() => setIsDrawerOpen(false)}
                        >
                          {child.icon && (
                            <ListItemIcon sx={{ color: 'white', minWidth: 36 }}>
                              <i className={child.icon} />
                            </ListItemIcon>
                          )}
                          <ListItemText primary={child.title} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </div>
              )
            }

            return (
              <ListItemButton
                key={index}
                component={Link}
                href={item.href || '#'}
                sx={{
                  borderRadius: 1,
                  mb: 1,
                  backgroundColor: isActiveLink(item.href || '') ? 'rgba(0, 229, 255, 0.2)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
                onClick={() => setIsDrawerOpen(false)}
              >
                <ListItemText
                  primary={item.title}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontWeight: isActiveLink(item.href || '') ? 600 : 400,
                      color: isActiveLink(item.href || '') ? '#00E5FF' : 'white'
                    }
                  }}
                />
              </ListItemButton>
            )
          })}
        </List>
      </Box>
    </Drawer>
  )

  return (
    <header className={classnames(frontLayoutClasses.header, styles.header)}>
      <div
        className={classnames(
          frontLayoutClasses.navbar,
          styles.navbar,
          { [styles.headerScrolled]: trigger }
        )}
        style={{
          background: trigger
            ? 'rgba(30, 60, 114, 0.95)'
            : 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          backdropFilter: trigger ? 'blur(10px)' : 'none',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className={classnames(frontLayoutClasses.navbarContent, styles.navbarContent)}>
          {/* Logo and Mobile Menu */}
          <div className='flex items-center gap-4'>
            {isBelowLgScreen && (
              <IconButton
                onClick={() => setIsDrawerOpen(true)}
                sx={{ color: 'white' }}
              >
                <i className='ri-menu-line text-xl' />
              </IconButton>
            )}

            <Link href='/front-pages/landing-page' className='flex items-center gap-2'>
              <i className='ri-shield-check-line text-2xl text-cyan-400' />
              <Typography
                variant='h6'
                sx={{
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #00E5FF, #E3F2FD)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                Disaster Alert System
              </Typography>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {renderDesktopMenu()}

          {/* Right side actions */}
          <div className='flex items-center gap-2'>
            <ModeDropdown />

            <Tooltip title='Emergency Dashboard'>
              <Button
                component={Link}
                variant='contained'
                href='/login'
                startIcon={<i className='ri-dashboard-line' />}
                sx={{
                  background: 'linear-gradient(45deg, #FF6B6B, #FF8E53)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #FF5252, #FF7043)'
                  },
                  borderRadius: 2,
                  px: { xs: 1, sm: 2 },
                  minWidth: { xs: 'auto', sm: 'auto' }
                }}
              >
                <span className='hidden sm:inline'>Dashboard</span>
              </Button>
            </Tooltip>

            <Tooltip title='Report Emergency'>
              <CustomIconButton
                component={Link}
                variant='contained'
                href='/front-pages/emergency-report'
                color='error'
                sx={{
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': {
                      boxShadow: '0 0 0 0 rgba(255, 107, 107, 0.7)'
                    },
                    '70%': {
                      boxShadow: '0 0 0 10px rgba(255, 107, 107, 0)'
                    },
                    '100%': {
                      boxShadow: '0 0 0 0 rgba(255, 107, 107, 0)'
                    }
                  }
                }}
              >
                <i className='ri-alarm-warning-line text-xl' />
              </CustomIconButton>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {renderMobileDrawer()}
    </header>
  )
}

export default DisasterAlertHeader
