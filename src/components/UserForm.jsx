import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Fade,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const StyledFormContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: 500,
  margin: "0 auto",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 16,
  background: "rgba(255, 255, 255, 0.95)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
  border: "1px solid rgba(226, 232, 240, 0.8)",
  backdropFilter: "blur(10px)",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    backgroundColor: "rgba(248, 250, 252, 0.8)",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: "rgba(248, 250, 252, 1)",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(59, 130, 246, 0.5)",
      },
    },
    "&.Mui-focused": {
      backgroundColor: "rgba(255, 255, 255, 1)",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#3b82f6",
        borderWidth: 2,
      },
    },
  },
  "& .MuiInputLabel-root": {
    fontWeight: 500,
    color: "#374151",
    "&.Mui-focused": {
      color: "#3b82f6",
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: theme.spacing(1.5, 3),
  fontWeight: 600,
  fontSize: "1rem",
  textTransform: "none",
  background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(59, 130, 246, 0.4)",
  },
  "&:active": {
    transform: "translateY(0)",
  },
}));

const IconContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 56,
  height: 56,
  borderRadius: 16,
  background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
  marginBottom: theme.spacing(2),
  margin: "0 auto",
  marginBottom: theme.spacing(3),
}));

export default function UserForm({ addUser, data, isEdit, updateUser, onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  //update lifecycle to set data when isEdit is true
  // This will run when the component mounts or when the data prop changes
  useEffect(() => {
    if (data && isEdit) {
      setName(data.name || "");
      setEmail(data.email || "");
    } else if (!isEdit) {
      // Clear form when not in edit mode
      setName("");
      setEmail("");
      setErrors({});
    }
  }, [data, isEdit]);

  // Clear form after successful operations
  const clearForm = () => {
    setName("");
    setEmail("");
    setErrors({});
    setShowSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Handle form submission here
      console.log("Form submitted:", { name, email });

      if (isEdit) {
        updateUser({ name, email });
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          if (onSuccess) onSuccess();
        }, 2000);
      } else {
        addUser({ name, email });
        setShowSuccess(true);
        clearForm();
        setTimeout(() => setShowSuccess(false), 3000);
      }
    }
  };

  return (
    <StyledFormContainer>
      <Fade in={true} timeout={600}>
        <StyledPaper elevation={0}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <IconContainer>
              <PersonAddIcon sx={{ color: "white", fontSize: 28 }} />
            </IconContainer>
            <Typography
              variant={isMobile ? "h5" : "h4"}
              fontWeight={700}
              color="text.primary"
              gutterBottom
            >
              {isEdit ? "Edit User" : "Add New User"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {isEdit 
                ? "Update the user information below" 
                : "Fill in the details to create a new user account"
              }
            </Typography>
          </Box>

          {showSuccess && (
            <Fade in={showSuccess}>
              <Alert
                severity="success"
                sx={{
                  mb: 3,
                  borderRadius: 2,
                  "& .MuiAlert-icon": {
                    fontSize: "1.25rem",
                  },
                }}
              >
                {isEdit ? "User updated successfully!" : "User added successfully!"}
              </Alert>
            </Fade>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Box sx={{ mb: 3 }}>
              <StyledTextField
                fullWidth
                label="Full Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) {
                    setErrors((prev) => ({ ...prev, name: "" }));
                  }
                }}
                error={!!errors.name}
                helperText={errors.name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: "#6b7280" }} />
                    </InputAdornment>
                  ),
                }}
                placeholder="Enter your full name"
              />
            </Box>

            <Box sx={{ mb: 4 }}>
              <StyledTextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors((prev) => ({ ...prev, email: "" }));
                  }
                }}
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: "#6b7280" }} />
                    </InputAdornment>
                  ),
                }}
                placeholder="Enter your email address"
              />
            </Box>

            <StyledButton
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              startIcon={<PersonAddIcon />}
            >
              {isEdit ? "Update User" : "Add User"}
            </StyledButton>

            {isEdit && (
              <StyledButton
                variant="outlined"
                fullWidth
                size="large"
                sx={{ 
                  mt: 2, 
                  color: "#6b7280", 
                  borderColor: "#d1d5db",
                  "&:hover": {
                    borderColor: "#9ca3af",
                    backgroundColor: "rgba(107, 114, 128, 0.04)"
                  }
                }}
                onClick={() => {
                  if (onSuccess) onSuccess();
                }}
              >
                Cancel
              </StyledButton>
            )}

            {/* <StyledButton
              variant="outlined"
              fullWidth
              size="large"
              sx={{ mt: 2, color: "#ffffff", borderColor: "#3b82f6" }}
              onClick={() => {
                setName("");
                setEmail("");
                setErrors({});
                setShowSuccess(false);
              }}
            >
              {isEdit ? "Cancel Update" : "Clear Form"}
            </StyledButton> */}
          </Box>
        </StyledPaper>
      </Fade>
    </StyledFormContainer>
  );
}
