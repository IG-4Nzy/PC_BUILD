
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Send, User, Bot, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { useAppContext } from "@/context/AppContext";

const ChatbotAssistance = () => {
  const navigate = useNavigate();
  const { chatMessages, addChatMessage } = useAppContext();
  const [inputMessage, setInputMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [chatMessages]);

  // Initialize with a welcome message if empty
  useEffect(() => {
    if (chatMessages.length === 0) {
      addChatMessage({
        text: "Hello! I'm your PC building assistant. How can I help you today?",
        sender: "bot"
      });
    }
  }, [addChatMessage, chatMessages.length]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;
    
    // Add user message
    addChatMessage({
      text: inputMessage,
      sender: "user"
    });
    
    // Clear input
    setInputMessage("");
    
    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "I recommend an RTX 4070 for gaming at 1440p resolution. It offers great performance for the price.",
        "For content creation, the AMD Ryzen 9 7950X provides excellent multi-core performance.",
        "If you're primarily gaming, 16GB of RAM is sufficient, but for video editing or 3D work, I'd recommend 32GB or more.",
        "SSDs are much faster than HDDs for boot drives. I recommend at least a 1TB NVMe SSD for your operating system and frequently used applications.",
        "When choosing a motherboard, ensure it's compatible with your CPU socket type and has all the features you need.",
        "For your power supply, I recommend going with at least a 750W Gold-rated unit for a high-end gaming system.",
        "Liquid cooling offers better thermal performance than air cooling, but quality air coolers are often more reliable and less expensive."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      addChatMessage({
        text: randomResponse,
        sender: "bot"
      });
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleMicrophone = () => {
    setIsRecording(!isRecording);
    // This would normally integrate with a speech recognition API
  };

  return (
    <div className="container mx-auto h-[calc(100vh-2rem)] flex flex-col py-4 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col"
      >
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/builds')}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">PC Building Assistant</h1>
        </div>
        
        <Card className="flex-1 mb-4 overflow-hidden flex flex-col">
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {chatMessages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`flex max-w-[80%] ${
                      message.sender === 'user' 
                        ? 'flex-row-reverse' 
                        : 'flex-row'
                    }`}
                  >
                    <div 
                      className={`rounded-full w-8 h-8 flex items-center justify-center ${
                        message.sender === 'user' 
                          ? 'bg-primary ml-2' 
                          : 'bg-secondary mr-2'
                      }`}
                    >
                      {message.sender === 'user' 
                        ? <User className="h-4 w-4 text-primary-foreground" /> 
                        : <Bot className="h-4 w-4 text-secondary-foreground" />
                      }
                    </div>
                    <div 
                      className={`rounded-lg p-3 ${
                        message.sender === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <CardContent className="pt-4 border-t">
            <div className="flex gap-2">
              <Button
                variant={isRecording ? "destructive" : "outline"}
                size="icon"
                onClick={toggleMicrophone}
                className="shrink-0"
              >
                {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>
              <Input
                placeholder="Type your question here..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={inputMessage.trim() === ""}
                className="shrink-0"
              >
                <Send className="h-5 w-5 mr-2" />
                Send
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ChatbotAssistance;
