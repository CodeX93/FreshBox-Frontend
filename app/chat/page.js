"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Badge,
  InputAdornment,
  Drawer,
  Button,
  CircularProgress,
  useMediaQuery,
  AppBar,
  Toolbar,
} from "@mui/material";
import { theme } from "../../contexts/Theme";
import {
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  Image as ImageIcon,
  KeyboardArrowLeft as BackIcon,
  MoreVert as MoreVertIcon,
  Phone as PhoneIcon,
  Search as SearchIcon,
  DeleteOutline as DeleteIcon,
  InfoOutlined as InfoIcon,
  Close as CloseIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import Navbar from "../../components/Navbar";
import { useChat } from "@/contexts/ChatContext";
import { useRouter } from "next/navigation";


// Utility function to get initials from name
const getInitials = (name) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};

// Format timestamp for messages
const formatTime = (time) => {
  return time;
};

// Chat Screen Component
export default function RiderChatScreen() {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const messagesContainerRef = useRef(null);
  const [conversations, setConversations] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showConversations, setShowConversations] = useState(!isMobile);
  const {
    chats,
    selectedConversation,
    setSelectedConversation,
    messages,
    setMessages,
    sendMessage,
    joinChat,
  } = useChat();
  const router = useRouter();

  useEffect(() => {
    if (chats) {
      setConversations(chats);
    }
  }, [chats]);

  // For navigation back to home screen
  const handleBackToHome = () => {
    router.push("/");
  };

  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    const messagesContainer = messagesContainerRef.current;
    if (messagesContainer) {
      // Only scroll if we're near the bottom (within 200px)
      const isNearBottom = 
        messagesContainer.scrollHeight - messagesContainer.scrollTop <= 
        messagesContainer.clientHeight + 200;
      
      if (isNearBottom) {
        messagesContainer.scrollTo({
          top: messagesContainer.scrollHeight,
          behavior: "smooth"
        });
      }
    }
  };

  // Load messages when a conversation is selected
  useEffect(() => {
    if (selectedConversation) {
      setLoading(true);
      setMessages(selectedConversation.messages);
      setLoading(false);
      // On mobile, hide the conversation list when a chat is selected
      if (isMobile) {
        setShowConversations(false);
      }
    }
  }, [selectedConversation, isMobile]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Reset view on screen size change
  useEffect(() => {
    if (!isMobile) {
      setShowConversations(true);
    }
  }, [isMobile]);

  useEffect(() => {
    if (selectedConversation) {
      joinChat(selectedConversation);
    }
  }, [selectedConversation, joinChat]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    sendMessage(newMessage);
    setNewMessage("");
  };

  // Handle selecting a conversation
  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  // Handle going back to conversation list on mobile
  const handleBackToList = () => {
    setShowConversations(true);
  };

  // Toggle drawer for order details
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Get message status icon
  const getMessageStatus = (status) => {
    switch (status) {
      case false:
        return "✓✓";
      case true:
        return <span style={{ color: theme.palette.primary.main }}>✓✓</span>;
    }
  };

  // Main turquoise color
  const turquoiseColor = theme.palette.primary.main;
  const darkBlueColor = theme.palette.primary.darkBlue;
  const whitishMintColor = theme.palette.primary.whitishMint;
  const mainHoverColor = theme.palette.primary.mainHover;

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          bgcolor: whitishMintColor,
          overflow: "hidden",
          mt: 5,
        }}
      >
        {/* Conversation List */}
        <Box
          sx={{
            width: isMobile ? "100%" : 350,
            display: showConversations || !isMobile ? "flex" : "none",
            flexDirection: "column",
            borderRight: `1px solid ${theme.palette.divider}`,
            bgcolor: whitishMintColor,
            zIndex: 10,
          }}
        >
          <AppBar
            position="static"
            elevation={1}
            sx={{ bgcolor: "background.paper" }}
          >
            <Toolbar sx={{ px: 2 }}>
              <IconButton
                edge="start"
                onClick={handleBackToHome}
                sx={{ mr: 1, color: darkBlueColor }}
              >
                <BackIcon />
              </IconButton>
              <Typography
                variant="h6"
                sx={{ color: darkBlueColor, flexGrow: 1, fontWeight: 600 }}
              >
                Chat Messages
              </Typography>
              <IconButton edge="end" sx={{ color: turquoiseColor }}>
                <SearchIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          <List sx={{ overflow: "auto", flexGrow: 1, px: 1 }}>
            {conversations.map((conversation) => (
              <ListItem
                key={conversation._id}
                alignItems="flex-start"
                component="div"
                selected={selectedConversation?._id === conversation._id}
                onClick={() => handleSelectConversation(conversation)}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  transition: "all 0.2s",
                  cursor: "pointer",
                  "&.Mui-selected": {
                    bgcolor: `${turquoiseColor}15`,
                  },
                  "&:hover": {
                    bgcolor: `${turquoiseColor}10`,
                  },
                }}
              >
                <ListItemAvatar>
                  <Badge
                    overlap="circular"
                    badgeContent={0}
                    color="primary"
                    sx={{
                      "& .MuiBadge-badge": {
                        backgroundColor: turquoiseColor,
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: darkBlueColor,
                        color: "white",
                      }}
                    >
                      {getInitials(conversation.riderId.name)}
                    </Avatar>
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        component="span"
                        sx={{ fontWeight: 600 }}
                      >
                        {conversation.riderId.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {conversation.riderId.name}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <>
                      {/* Using direct spans instead of Typography to avoid nesting issues */}
                      <span
                        style={{
                          display: "block",
                          marginTop: "4px",
                          color: theme.palette.text.secondary,
                          fontSize: "0.875rem",
                          fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                          lineHeight: "1.43",
                          letterSpacing: "0.01071em",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {conversation.messages.length > 0
                          ? conversation.messages[
                              conversation.messages.length - 1
                            ].content || "No message content"
                          : "No messages yet"}
                      </span>
                      <span
                        style={{
                          display: "block",
                          marginTop: "4px",
                          color: turquoiseColor,
                          fontSize: "0.75rem",
                          fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                          fontWeight: "400",
                          lineHeight: "1.66",
                          letterSpacing: "0.03333em",
                        }}
                      >
                        {conversation.orderId._id} •{" "}
                        {conversation.orderId.status}
                      </span>
                    </>
                  }
                  primaryTypographyProps={{
                    fontWeight: conversation.unread > 0 ? 700 : 500,
                  }}
                  sx={{ my: 0.5 }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Chat Area */}
        <Box
          sx={{
            flexGrow: 1,
            display: !showConversations || !isMobile ? "flex" : "none",
            flexDirection: "column",
            bgcolor: whitishMintColor,
            position: "relative",
          }}
        >
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <AppBar
                position="static"
                elevation={1}
                sx={{ bgcolor: "background.paper" }}
              >
                <Toolbar sx={{ px: 2 }}>
                  {isMobile && (
                    <IconButton
                      edge="start"
                      onClick={handleBackToList}
                      sx={{ mr: 1, color: turquoiseColor }}
                    >
                      <BackIcon />
                    </IconButton>
                  )}
                  <Avatar
                    sx={{
                      mr: 2,
                      bgcolor: darkBlueColor,
                      color: "white",
                    }}
                  >
                    {getInitials(selectedConversation.riderId.name)}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 600, color: "text.primary" }}
                    >
                      {selectedConversation.riderId.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {selectedConversation.riderId.name} •{" "}
                      {selectedConversation.orderId._id}
                    </Typography>
                  </Box>
                  <IconButton
                    sx={{ color: turquoiseColor }}
                    onClick={toggleDrawer}
                  >
                    <InfoIcon />
                  </IconButton>
                </Toolbar>
              </AppBar>

              {/* Messages */}
              <Box
                sx={{
                  flexGrow: 1,
                  p: 2,
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                }}
                ref={messagesContainerRef}
              >
                {loading ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <CircularProgress sx={{ color: turquoiseColor }} />
                  </Box>
                ) : messages.length > 0 ? (
                  messages.map((message) => (
                    <Box
                      key={message._id}
                      sx={{
                        display: "flex",
                        justifyContent:
                          message.sender === "user" ? "flex-end" : "flex-start",
                        mb: 2,
                      }}
                    >
                      {message.sender === "rider" && (
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            mr: 1,
                            mt: 0.5,
                            bgcolor: darkBlueColor,
                            color: "white",
                            display: { xs: "none", sm: "flex" },
                          }}
                        >
                          {getInitials(selectedConversation.riderId.name)}
                        </Avatar>
                      )}
                      <Box sx={{ maxWidth: "70%" }}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            borderRadius: 3,
                            bgcolor:
                              message.sender === "user"
                                ? turquoiseColor
                                : "background.paper",
                            color:
                              message.sender === "user"
                                ? "white"
                                : "text.primary",
                            borderTopRightRadius:
                              message.sender === "user" ? 0 : 3,
                            borderTopLeftRadius:
                              message.sender === "rider" ? 0 : 3,
                          }}
                        >
                          <Typography variant="body1">
                            {message.content}
                          </Typography>
                        </Paper>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent:
                              message.sender === "user"
                                ? "flex-end"
                                : "flex-start",
                            alignItems: "center",
                            mt: 0.5,
                            px: 1,
                          }}
                        >
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontSize: "0.7rem" }}
                          >
                            {message.timestamp}
                          </Typography>

                          {message.sender === "user" && (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{
                                ml: 0.5,
                                fontSize: "0.7rem",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {getMessageStatus(message.isRead)}
                            </Typography>
                          )}
                        </Box>
                        
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <Typography color="text.secondary">
                      No messages yet. Start the conversation!
                    </Typography>
                  </Box>
                )}
                <div ref={messagesEndRef} />
              
              </Box>

              {/* Message Input */}
              <Box
                component="form"
                sx={{
                  p: 2,
                  bgcolor: "background.paper",
                  borderTop: `1px solid ${theme.palette.divider}`,
                }}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 4,
                        bgcolor: whitishMintColor,
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: turquoiseColor,
                        },
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            type="submit"
                            sx={{
                              color: "white",
                              bgcolor: turquoiseColor,
                              "&:hover": {
                                bgcolor: mainHoverColor,
                              },
                            }}
                            disabled={!newMessage.trim()}
                          >
                            <SendIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Box>
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                flexDirection: "column",
                p: 3,
                textAlign: "center",
              }}
            >
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  mb: 2,
                  bgcolor: darkBlueColor,
                  color: "white",
                }}
              >
                <SendIcon sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: 600, color: "text.primary" }}
              >
                Select a conversation
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Choose a rider conversation to start messaging
              </Typography>
            </Box>
          )}
        </Box>

        {/* Order Details Drawer */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer}
          variant="temporary"
          PaperProps={{
            sx: { width: { xs: "100%", sm: 350 } },
          }}
        >
          {selectedConversation && (
            <Box
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  bgcolor: turquoiseColor,
                  color: "white",
                }}
              >
                <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
                  Order Details
                </Typography>
                <IconButton onClick={toggleDrawer} sx={{ color: "white" }}>
                  <CloseIcon />
                </IconButton>
              </Box>

              <Box sx={{ p: 3, flexGrow: 1, overflowY: "auto" }}>
                <Box
                  sx={{
                    mb: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mb: 2,
                      bgcolor: darkBlueColor,
                      color: "white",
                    }}
                  >
                    {getInitials(selectedConversation.riderId.name)}
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {selectedConversation.riderId.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {selectedConversation.riderId.name}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {selectedConversation.riderId.phoneNumber}
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  Order Information
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Paper
                    elevation={0}
                    sx={{ borderRadius: 2, p: 2, bgcolor: whitishMintColor }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Order ID
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {selectedConversation.orderId._id}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Status
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          color:
                            selectedConversation.orderStatus === "In Transit"
                              ? turquoiseColor
                              : "text.primary",
                        }}
                      >
                        {selectedConversation.orderId.status}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Date
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {selectedConversation.orderId.createdAt}
                      </Typography>
                    </Box>
                  </Paper>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Button
                    disableElevation
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    sx={{ borderRadius: 2 }}
                  >
                    Delete Chat
                  </Button>
                  <Button
                    disableElevation
                    variant="contained"
                    sx={{
                      borderRadius: 2,
                      bgcolor: turquoiseColor,
                      "&:hover": {
                        bgcolor: mainHoverColor,
                      },
                    }}
                  >
                    View Order
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </Drawer>
      </Box>
    </>
  );
}
