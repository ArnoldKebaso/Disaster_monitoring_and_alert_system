// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Tooltip from '@mui/material/Tooltip'

// Third-party Imports
import classnames from 'classnames'
import { toast } from 'react-toastify'

// Component Imports
import Link from '@components/Link'

// Util Imports
import { frontLayoutClasses } from '@layouts/utils/layoutClasses'

// Styles Imports
import styles from './styles.module.css'
import frontCommonStyles from '@views/front-pages/styles.module.css'

const DisasterAlertFooter = () => {
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }

    setIsSubscribing(true)

    try {
      // Simulate API call - replace with your actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Thank you for subscribing to emergency alerts!')
      setEmail('')
    } catch (error) {
      toast.error('Subscription failed. Please try again.')
    } finally {
      setIsSubscribing(false)
    }
  }

  const quickLinks = [
    { title: 'Emergency Dashboard', href: '/login', icon: 'ri-dashboard-line' },
    { title: 'Report Incident', href: '/front-pages/report', icon: 'ri-alarm-warning-line' },
    { title: 'Safety Resources', href: '/front-pages/resources', icon: 'ri-book-line' },
    { title: 'Contact Emergency', href: '/front-pages/emergency-contact', icon: 'ri-phone-line' }
  ]

  const emergencyNumbers = [
    { service: 'Emergency Services', number: '999', icon: 'ri-phone-line' },
    { service: 'Disaster Hotline', number: '1199', icon: 'ri-customer-service-line' },
    { service: 'Red Cross', number: '1199', icon: 'ri-heart-pulse-line' }
  ]

  const socialLinks = [
    { platform: 'Facebook', icon: 'ri-facebook-fill', url: '#', color: '#1877F2' },
    { platform: 'Twitter', icon: 'ri-twitter-x-fill', url: '#', color: '#1DA1F2' },
    { platform: 'Instagram', icon: 'ri-instagram-fill', url: '#', color: '#E4405F' },
    { platform: 'YouTube', icon: 'ri-youtube-fill', url: '#', color: '#FF0000' },
    { platform: 'WhatsApp', icon: 'ri-whatsapp-fill', url: '#', color: '#25D366' }
  ]

  return (
    <footer className={frontLayoutClasses.footer}>
      <div className='relative overflow-hidden'>
        {/* Background with gradient overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #1e3c72 100%)',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }
          }}
        />

        <div className={classnames('relative z-10 text-white', frontCommonStyles.layoutSpacing)}>
          {/* Emergency Quick Access Bar */}
          <Box
            sx={{
              background: 'rgba(255, 107, 107, 0.1)',
              borderRadius: 2,
              p: 3,
              mb: 6,
              border: '1px solid rgba(255, 107, 107, 0.2)'
            }}
          >
            <Typography variant='h6' className='mb-4 flex items-center gap-2'>
              <i className='ri-alarm-warning-line text-red-400' />
              Emergency Quick Access
            </Typography>
            <Grid container spacing={2}>
              {emergencyNumbers.map((emergency, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <Card sx={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton
                          sx={{
                            background: 'rgba(255, 107, 107, 0.2)',
                            color: '#FF6B6B',
                            '&:hover': { background: 'rgba(255, 107, 107, 0.3)' }
                          }}
                        >
                          <i className={emergency.icon} />
                        </IconButton>
                        <Box>
                          <Typography variant='body2' sx={{ color: 'white', opacity: 0.9 }}>
                            {emergency.service}
                          </Typography>
                          <Typography variant='h6' sx={{ color: '#00E5FF', fontWeight: 'bold' }}>
                            {emergency.number}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Main Footer Content */}
          <Grid container rowSpacing={8} columnSpacing={6}>
            {/* Company Info & Newsletter */}
            <Grid size={{ xs: 12, lg: 5 }}>
              <div className='flex flex-col gap-6'>
                {/* Logo and Description */}
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <i className='ri-shield-check-line text-3xl text-cyan-400' />
                    <Typography variant='h5' sx={{ fontWeight: 'bold', color: 'white' }}>
                      Disaster Alert System
                    </Typography>
                  </Box>
                  <Typography color='white' sx={{ opacity: 0.9, lineHeight: 1.6, mb: 4 }}>
                    Protecting communities through real-time flood monitoring, early warning systems,
                    and emergency response coordination. Together, we build resilient communities
                    prepared for natural disasters.
                  </Typography>
                </Box>

                {/* Newsletter Subscription */}
                <Box>
                  <Typography variant='h6' sx={{ mb: 2, color: '#00E5FF' }}>
                    Stay Informed - Subscribe to Emergency Alerts
                  </Typography>
                  <Box
                    component='form'
                    onSubmit={handleNewsletterSubmit}
                    sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}
                  >
                    <TextField
                      size='small'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='Enter your email for alerts'
                      variant='outlined'
                      sx={{
                        flex: 1,
                        '& .MuiOutlinedInput-root': {
                          background: 'rgba(255, 255, 255, 0.1)',
                          color: 'white',
                          '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.3)'
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.5)'
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#00E5FF'
                          }
                        },
                        '& .MuiInputBase-input::placeholder': {
                          color: 'rgba(255, 255, 255, 0.7)'
                        }
                      }}
                    />
                    <Button
                      type='submit'
                      variant='contained'
                      disabled={isSubscribing}
                      startIcon={isSubscribing ? <i className='ri-loader-4-line animate-spin' /> : <i className='ri-notification-line' />}
                      sx={{
                        background: 'linear-gradient(45deg, #00E5FF, #2196F3)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #00B8D4, #1976D2)'
                        },
                        px: 3
                      }}
                    >
                      {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                    </Button>
                  </Box>
                </Box>
              </div>
            </Grid>

            {/* Quick Links */}
            <Grid size={{ xs: 12, sm: 6, lg: 2.5 }}>
              <Typography variant='h6' sx={{ mb: 3, color: '#00E5FF', fontWeight: 'bold' }}>
                Quick Access
              </Typography>
              <List sx={{ p: 0 }}>
                {quickLinks.map((link, index) => (
                  <ListItem key={index} sx={{ p: 0, mb: 1 }}>
                    <ListItemButton
                      component={Link}
                      href={link.href}
                      sx={{
                        borderRadius: 1,
                        p: 1,
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.1)'
                        }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36, color: '#00E5FF' }}>
                        <i className={link.icon} />
                      </ListItemIcon>
                      <ListItemText
                        primary={link.title}
                        sx={{
                          '& .MuiListItemText-primary': {
                            color: 'white',
                            fontSize: '0.9rem',
                            opacity: 0.9
                          }
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Grid>

            {/* Resources & Support */}
            <Grid size={{ xs: 12, sm: 6, lg: 2.5 }}>
              <Typography variant='h6' sx={{ mb: 3, color: '#00E5FF', fontWeight: 'bold' }}>
                Resources & Support
              </Typography>
              <List sx={{ p: 0 }}>
                {[
                  { title: 'Emergency Guidelines', href: '/front-pages/guidelines', icon: 'ri-file-text-line' },
                  { title: 'Safety Training', href: '/front-pages/training', icon: 'ri-graduation-cap-line' },
                  { title: 'Community Forum', href: '/front-pages/forum', icon: 'ri-discuss-line' },
                  { title: 'Help Center', href: '/front-pages/help-center', icon: 'ri-customer-service-2-line' },
                  { title: 'Download App', href: '/front-pages/download', icon: 'ri-smartphone-line' }
                ].map((link, index) => (
                  <ListItem key={index} sx={{ p: 0, mb: 1 }}>
                    <ListItemButton
                      component={Link}
                      href={link.href}
                      sx={{
                        borderRadius: 1,
                        p: 1,
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.1)'
                        }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36, color: '#00E5FF' }}>
                        <i className={link.icon} />
                      </ListItemIcon>
                      <ListItemText
                        primary={link.title}
                        sx={{
                          '& .MuiListItemText-primary': {
                            color: 'white',
                            fontSize: '0.9rem',
                            opacity: 0.9
                          }
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Grid>

            {/* Social Media & Contact */}
            <Grid size={{ xs: 12, lg: 2 }}>
              <Typography variant='h6' sx={{ mb: 3, color: '#00E5FF', fontWeight: 'bold' }}>
                Stay Connected
              </Typography>

              {/* Social Media Links */}
              <Box sx={{ display: 'flex', gap: 1, mb: 4, flexWrap: 'wrap' }}>
                {socialLinks.map((social, index) => (
                  <Tooltip key={index} title={social.platform}>
                    <IconButton
                      component='a'
                      href={social.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      sx={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        color: 'white',
                        '&:hover': {
                          background: social.color,
                          transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <i className={social.icon} />
                    </IconButton>
                  </Tooltip>
                ))}
              </Box>

              {/* Contact Info */}
              <Box>
                <Typography variant='body2' sx={{ color: 'white', opacity: 0.9, mb: 1 }}>
                  24/7 Emergency Support
                </Typography>
                <Typography variant='body2' sx={{ color: '#00E5FF', fontWeight: 'bold', mb: 2 }}>
                  emergency@disasteralert.org
                </Typography>

                <Chip
                  icon={<i className='ri-time-line' />}
                  label='Always Online'
                  sx={{
                    background: 'rgba(76, 175, 80, 0.2)',
                    color: '#4CAF50',
                    border: '1px solid rgba(76, 175, 80, 0.3)'
                  }}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Bottom Section */}
          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', my: 6 }} />

          <Grid container spacing={4} alignItems='center'>
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant='body2' sx={{ color: 'white', opacity: 0.8 }}>
                © {new Date().getFullYear()} Disaster Alert System. All rights reserved.
                Built with ❤️ for community safety and disaster preparedness.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ display: 'flex', gap: 3, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                <Link href='/front-pages/privacy' className='text-white opacity-80 hover:opacity-100 transition-opacity'>
                  Privacy Policy
                </Link>
                <Link href='/front-pages/terms' className='text-white opacity-80 hover:opacity-100 transition-opacity'>
                  Terms of Service
                </Link>
                <Link href='/front-pages/cookies' className='text-white opacity-80 hover:opacity-100 transition-opacity'>
                  Cookie Policy
                </Link>
              </Box>
            </Grid>
          </Grid>
        </div>
      </div>
    </footer>
  )
}

export default DisasterAlertFooter
