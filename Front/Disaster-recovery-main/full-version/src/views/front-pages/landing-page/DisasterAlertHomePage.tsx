'use client'

// React Imports
import { useState, useEffect } from 'react'

// Next Imports
import Link from 'next/link'
import Image from 'next/image'

// MUI Imports
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Fab from '@mui/material/Fab'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import type { Theme } from '@mui/material/styles'

// Third-party Imports
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import classnames from 'classnames'

// Type Imports
import type { Mode } from '@core/types'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'

// Styles Imports
import styles from './styles.module.css'
import frontCommonStyles from '@views/front-pages/styles.module.css'

// Hero Images (placeholder paths - replace with your actual images)
const heroImages = [
  '/images/disaster-alert/budalangi1.jpeg',
  '/images/disaster-alert/budalangi3.jpg',
  '/images/disaster-alert/budalangi8.jpeg',
  '/images/disaster-alert/budalangi9.jpeg',
  '/images/disaster-alert/budalangi6.jpeg'
]

// Location options for subscription
const locationOptions = [
  'Bumadeya', 'Budalangi Central', 'Budubusi', 'Mundere', 'Musoma',
  'Sibuka', 'Sio Port', 'Rukala', 'Mukhweya', 'Sigulu Island',
  'Siyaya', 'Nambuku', 'West Bunyala', 'East Bunyala', 'South Bunyala'
]

// Service features data
const serviceFeatures = [
  {
    title: 'Real-Time Flood Monitoring',
    description: 'Advanced sensor networks providing 24/7 monitoring of water levels and weather conditions across all vulnerable areas.',
    icon: 'ri-radar-line',
    image: '/images/disaster-alert/flood-monitoring.png',
    color: '#2196F3'
  },
  {
    title: 'Emergency Alert System',
    description: 'Instant notifications via SMS, email, and mobile app alerts to keep communities informed of impending dangers.',
    icon: 'ri-notification-3-line',
    image: '/images/disaster-alert/alert-system.png',
    color: '#FF9800'
  },
  {
    title: 'Resource Allocation',
    description: 'Strategic distribution of emergency supplies, evacuation resources, and medical aid to affected communities.',
    icon: 'ri-truck-line',
    image: '/images/disaster-alert/resource-allocation.png',
    color: '#4CAF50'
  },
  {
    title: 'Emergency Response',
    description: 'Coordinated response teams with rapid deployment capabilities for search, rescue, and community support operations.',
    icon: 'ri-shield-check-line',
    image: '/images/disaster-alert/emergency-response.png',
    color: '#F44336'
  }
]

// Statistics data
const statsData = [
  { number: '50+', label: 'Communities Protected', icon: 'ri-community-line' },
  { number: '10,000+', label: 'Lives Safeguarded', icon: 'ri-heart-pulse-line' },
  { number: '500+', label: 'Emergency Alerts Sent', icon: 'ri-notification-line' },
  { number: '24/7', label: 'Monitoring Coverage', icon: 'ri-time-line' }
]

// FAQ Data
const faqData = [
  {
    question: 'How does the flood monitoring system work?',
    answer: 'Our system uses advanced IoT sensors placed strategically across flood-prone areas to monitor water levels, rainfall, and weather conditions in real-time. This data is processed by AI algorithms to predict flood risks and trigger early warning alerts.'
  },
  {
    question: 'How do I receive emergency alerts?',
    answer: 'You can subscribe to receive alerts through multiple channels including SMS, email, and our mobile app. Simply fill out our subscription form with your preferred contact method and select the locations you want to monitor.'
  },
  {
    question: 'What should I do when I receive a flood alert?',
    answer: 'Follow the emergency procedures outlined in the alert message. This typically includes moving to higher ground, avoiding flooded roads, and staying tuned for further updates. Have your emergency kit ready and follow evacuation orders if issued.'
  },
  {
    question: 'How can I contribute to disaster preparedness?',
    answer: 'You can contribute by staying informed, participating in community drills, volunteering with local emergency response teams, and making donations to support our monitoring infrastructure and community outreach programs.'
  }
]

const DisasterAlertHomePage = ({ mode }: { mode: Mode }) => {
  // States
  const [currentSlide, setCurrentSlide] = useState(0)
  const [subscriptionMethod, setSubscriptionMethod] = useState('')
  const [contact, setContact] = useState('')
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  // Hooks
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  // Hero carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Handle subscription form
  const handleSubscriptionSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!subscriptionMethod || !contact || selectedLocations.length === 0) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call - replace with your actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success('Successfully subscribed to emergency alerts!')

      // Reset form
      setSubscriptionMethod('')
      setContact('')
      setSelectedLocations([])
    } catch (error) {
      toast.error('Subscription failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  return (
    <div className='overflow-hidden'>
      {/* Hero Section with Carousel */}
      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Background Carousel */}
        <Box sx={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <AnimatePresence>
            {heroImages.map((image, index) =>
              index === currentSlide ? (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{ opacity: 1, scale: 1.1 }}
                  exit={{ opacity: 0, scale: 1 }}
                  transition={{ duration: 2 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
              ) : null
            )}
          </AnimatePresence>
          {/* Dark overlay */}
          <Box sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(30, 60, 114, 0.8) 0%, rgba(42, 82, 152, 0.6) 100%)'
          }} />
        </Box>

        {/* Hero Content */}
        <Container sx={{ position: 'relative', zIndex: 10, textAlign: 'center', color: 'white' }}>
          <motion.div initial='hidden' animate='visible' variants={staggerContainer}>
            <motion.div variants={fadeInUp}>
              <Typography
                variant={isMobile ? 'h3' : 'h1'}
                sx={{
                  fontWeight: 900,
                  mb: 3,
                  background: 'linear-gradient(45deg, #FFFFFF, #00E5FF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Protecting Communities from Natural Disasters
              </Typography>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Typography
                variant={isMobile ? 'h6' : 'h5'}
                sx={{ mb: 4, maxWidth: '800px', mx: 'auto', opacity: 0.9, lineHeight: 1.6 }}
              >
                Advanced flood monitoring, real-time alerts, and emergency response coordination
                to keep your community safe and prepared for natural disasters.
              </Typography>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  component={Link}
                  href='/front-pages/emergency-subscribe'
                  variant='contained'
                  size='large'
                  startIcon={<i className='ri-notification-line' />}
                  sx={{
                    background: 'linear-gradient(45deg, #00E5FF, #2196F3)',
                    px: 4,
                    py: 2,
                    borderRadius: 3,
                    fontSize: '1.1rem',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #00B8D4, #1976D2)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Get Emergency Alerts
                </Button>

                <Button
                  component={Link}
                  href='/front-pages/donate'
                  variant='outlined'
                  size='large'
                  startIcon={<i className='ri-heart-line' />}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    px: 4,
                    py: 2,
                    borderRadius: 3,
                    fontSize: '1.1rem',
                    '&:hover': {
                      borderColor: '#00E5FF',
                      backgroundColor: 'rgba(0, 229, 255, 0.1)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Support Our Mission
                </Button>
              </Box>
            </motion.div>
          </motion.div>
        </Container>

        {/* Scroll indicator */}
        <Box sx={{ position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ color: 'white', opacity: 0.8 }}
          >
            <i className='ri-arrow-down-line text-2xl' />
          </motion.div>
        </Box>
      </Box>

      {/* Emergency Alert Banner */}
      <Box sx={{
        background: 'linear-gradient(90deg, #FF6B6B, #FF8E53)',
        color: 'white',
        py: 2,
        textAlign: 'center'
      }}>
        <Container>
          <Typography variant='body1' sx={{ fontWeight: 600 }}>
            🚨 Emergency Hotline: 1199 | Report incidents immediately via our app
          </Typography>
        </Container>
      </Box>

      {/* Statistics Section */}
      <Box sx={{ py: 8, background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
        <Container>
          <Grid container spacing={4}>
            {statsData.map((stat, index) => (
              <Grid size={{ xs: 6, md: 3 }} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Paper
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                      border: '1px solid rgba(0, 0, 0, 0.05)',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <IconButton sx={{ color: '#2196F3', mb: 1 }}>
                      <i className={`${stat.icon} text-3xl`} />
                    </IconButton>
                    <Typography variant='h4' sx={{ fontWeight: 'bold', color: '#1e3c72', mb: 1 }}>
                      {stat.number}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {stat.label}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Services Section */}
      <Box sx={{ py: 12, background: 'white' }}>
        <Container>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant='h3' sx={{ fontWeight: 'bold', color: '#1e3c72', mb: 2 }}>
              Our Disaster Management Services
            </Typography>
            <Typography variant='h6' color='text.secondary' sx={{ maxWidth: '600px', mx: 'auto' }}>
              Comprehensive solutions designed to protect communities and save lives through technology and preparedness
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {serviceFeatures.map((service, index) => (
              <Grid size={{ xs: 12, md: 6, lg: 3 }} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card sx={{
                    height: '100%',
                    borderRadius: 3,
                    overflow: 'hidden',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    '&:hover': {
                      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)'
                    },
                    transition: 'all 0.3s ease'
                  }}>
                    <Box sx={{ p: 3, textAlign: 'center', bgcolor: `${service.color}15` }}>
                      <IconButton
                        sx={{
                          bgcolor: service.color,
                          color: 'white',
                          mb: 2,
                          '&:hover': { bgcolor: service.color }
                        }}
                      >
                        <i className={`${service.icon} text-2xl`} />
                      </IconButton>
                    </Box>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 2, color: '#1e3c72' }}>
                        {service.title}
                      </Typography>
                      <Typography variant='body2' color='text.secondary' sx={{ lineHeight: 1.6 }}>
                        {service.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Emergency Subscription Section */}
      <Box sx={{
        py: 12,
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        color: 'white'
      }}>
        <Container>
          <Grid container spacing={6} alignItems='center'>
            <Grid size={{ xs: 12, lg: 6 }}>
              <Typography variant='h3' sx={{ fontWeight: 'bold', mb: 3 }}>
                Stay Ahead of Disasters
              </Typography>
              <Typography variant='h6' sx={{ opacity: 0.9, mb: 4, lineHeight: 1.6 }}>
                Subscribe to receive real-time emergency alerts, safety updates, and evacuation
                notices for your area. Choose your preferred contact method and locations to monitor.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                <Chip
                  icon={<i className='ri-smartphone-line' />}
                  label='SMS Alerts'
                  sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
                />
                <Chip
                  icon={<i className='ri-mail-line' />}
                  label='Email Updates'
                  sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
                />
                <Chip
                  icon={<i className='ri-map-pin-line' />}
                  label='Location-Based'
                  sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, lg: 6 }}>
              <Paper sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 3, color: '#1e3c72' }}>
                  Emergency Alert Subscription
                </Typography>

                <Box component='form' onSubmit={handleSubscriptionSubmit}>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Contact Method</InputLabel>
                    <Select
                      value={subscriptionMethod}
                      onChange={(e) => setSubscriptionMethod(e.target.value)}
                      label='Contact Method'
                    >
                      <MenuItem value='email'>Email Alerts</MenuItem>
                      <MenuItem value='sms'>SMS Alerts</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    label={subscriptionMethod === 'email' ? 'Email Address' : 'Phone Number'}
                    placeholder={subscriptionMethod === 'email' ? 'your@email.com' : '+254 7XX XXX XXX'}
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    sx={{ mb: 3 }}
                  />

                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Locations to Monitor</InputLabel>
                    <Select
                      multiple
                      value={selectedLocations}
                      onChange={(e) => setSelectedLocations(e.target.value as string[])}
                      label='Locations to Monitor'
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} size='small' />
                          ))}
                        </Box>
                      )}
                    >
                      {locationOptions.map((location) => (
                        <MenuItem key={location} value={location}>
                          {location}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    size='large'
                    disabled={isSubmitting}
                    startIcon={isSubmitting ? <i className='ri-loader-4-line animate-spin' /> : <i className='ri-notification-line' />}
                    sx={{
                      background: 'linear-gradient(45deg, #00E5FF, #2196F3)',
                      py: 2,
                      fontSize: '1.1rem',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #00B8D4, #1976D2)'
                      }
                    }}
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe to Alerts'}
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ py: 12, bgcolor: '#f8fafc' }}>
        <Container>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant='h3' sx={{ fontWeight: 'bold', color: '#1e3c72', mb: 2 }}>
              Frequently Asked Questions
            </Typography>
            <Typography variant='h6' color='text.secondary'>
              Get answers to common questions about our disaster alert system
            </Typography>
          </Box>

          <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
            {faqData.map((faq, index) => (
              <Accordion
                key={index}
                expanded={expandedFaq === index}
                onChange={() => setExpandedFaq(expandedFaq === index ? null : index)}
                sx={{ mb: 2, borderRadius: 2, '&:before': { display: 'none' } }}
              >
                <AccordionSummary
                  expandIcon={<i className='ri-arrow-down-s-line' />}
                  sx={{
                    bgcolor: 'white',
                    borderRadius: 2,
                    '&.Mui-expanded': { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }
                  }}
                >
                  <Typography variant='h6' sx={{ fontWeight: 600, color: '#1e3c72' }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ bgcolor: '#f8fafc', borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                  <Typography color='text.secondary' sx={{ lineHeight: 1.7 }}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box sx={{
        py: 12,
        background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <Container>
          <Typography variant='h3' sx={{ fontWeight: 'bold', mb: 3 }}>
            Help Us Build Safer Communities
          </Typography>
          <Typography variant='h6' sx={{ opacity: 0.9, mb: 6, maxWidth: '600px', mx: 'auto' }}>
            Your support enables us to expand our monitoring network, improve alert systems,
            and provide better emergency response capabilities to vulnerable communities.
          </Typography>

          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={Link}
              href='/front-pages/donate'
              variant='contained'
              size='large'
              startIcon={<i className='ri-heart-line' />}
              sx={{
                bgcolor: 'white',
                color: '#FF6B6B',
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                '&:hover': {
                  bgcolor: '#f8f9fa',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Make a Donation
            </Button>

            <Button
              component={Link}
              href='/front-pages/volunteer'
              variant='outlined'
              size='large'
              startIcon={<i className='ri-user-heart-line' />}
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Volunteer With Us
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Emergency Report FAB */}
      <Tooltip title='Report Emergency' placement='left'>
        <Fab
          component={Link}
          href='/front-pages/emergency-report'
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            bgcolor: '#FF6B6B',
            color: 'white',
            '&:hover': { bgcolor: '#FF5252' },
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%': { boxShadow: '0 0 0 0 rgba(255, 107, 107, 0.7)' },
              '70%': { boxShadow: '0 0 0 10px rgba(255, 107, 107, 0)' },
              '100%': { boxShadow: '0 0 0 0 rgba(255, 107, 107, 0)' }
            }
          }}
        >
          <i className='ri-alarm-warning-line text-xl' />
        </Fab>
      </Tooltip>
    </div>
  )
}

export default DisasterAlertHomePage
