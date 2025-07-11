import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Chip,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import UserForm from "../components/UserForm";
import UsersTable from "../components/UsersTable";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import axios from "axios";
import { useEffect, useState } from "react";

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  minHeight: "100vh",
  background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
}));

const HeaderSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3, 4),
  marginBottom: theme.spacing(3),
  borderRadius: 16,
  background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  border: "1px solid rgba(226, 232, 240, 0.8)",
}));

const SectionCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  background: "rgba(255, 255, 255, 0.95)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
  border: "1px solid rgba(226, 232, 240, 0.6)",
  backdropFilter: "blur(10px)",
}));

const StatsChip = styled(Chip)(({ theme }) => ({
  background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
  color: "white",
  fontWeight: 600,
  fontSize: "0.875rem",
  height: 36,
  "& .MuiChip-icon": {
    color: "white",
  },
}));

export default function Users() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [users, setUsers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://54.242.120.63:3001/api/users");
      console.log("Fetched users:", response.data);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  //create a new user
  const createUser = (data) => {
    setSubmitted(true);
    const payload = {
      name: data.name,
      email: data.email,
    };
    axios
      .post("http://54.242.120.63:3001/api/createuser", payload)
      .then((response) => {
        fetchUsers();
        setSubmitted(false);
        setIsEdit(false);
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };

  //update a user
  const updateUser = (data) => {
    setSubmitted(true);
    console.log("Selected user:", selectedUser);
    console.log("Form data:", data);
    
    // Make sure we have a valid ID
    if (!selectedUser.id) {
      console.error("No user ID found for update");
      setSubmitted(false);
      return;
    }
    
    // Backend expects _id, name, and email in the request body
    const payload = {
      _id: selectedUser.id,  // Backend expects _id, not id
      name: data.name,
      email: data.email,
    };
    
    console.log("Update payload:", payload);
    
    axios
      .post("http://54.242.120.63:3001/api/updateuser", payload)
      .then((response) => {
        console.log("Update successful:", response);
        fetchUsers();
        setSubmitted(false);
        setIsEdit(false);
        setSelectedUser({});
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        console.error("Error response:", error.response);
        setSubmitted(false);
        // You might want to show an error message to the user here
        alert("Failed to update user. Please check the error in console.");
      });
  };

  //delete a user
  const deleteUser = (id) => {
    // Backend probably expects _id in the payload
    const payload = { _id: id };
    axios
      .post("http://54.242.120.63:3001/api/deleteuser", payload)
      .then((response) => {
        fetchUsers();
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <StyledContainer maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        {/* Header Section */}
        <HeaderSection elevation={0}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  background:
                    "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PeopleIcon sx={{ color: "white", fontSize: 28 }} />
              </Box>
              <Box>
                <Typography
                  variant={isMobile ? "h5" : "h4"}
                  fontWeight={700}
                  color="text.primary"
                  sx={{ mb: 0.5 }}
                >
                  User Management
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage your users and their information
                </Typography>
              </Box>
            </Box>
            <StatsChip
              icon={<PeopleIcon />}
              label={`${users.length} Users`}
              variant="filled"
            />
          </Box>
        </HeaderSection>

        {/* Main Content Grid */}
        <Grid container spacing={3}>
          {/* Form Section */}
          <Grid item xs={12} lg={4}>
            <SectionCard elevation={0}>
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 1,
                  }}
                >
                  <PersonAddIcon sx={{ color: "#3b82f6", fontSize: 24 }} />
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    color="text.primary"
                  >
                    Add New User
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Fill in the details to create a new user account
                </Typography>
              </Box>
              <Divider sx={{ mb: 3, opacity: 0.6 }} />
              <UserForm 
                addUser={createUser} 
                data={selectedUser} 
                isEdit={isEdit} 
                updateUser={updateUser}
                onSuccess={() => {
                  setIsEdit(false);
                  setSelectedUser({});
                }}
              />
            </SectionCard>
          </Grid>

          {/* Table Section */}
          <Grid item xs={12} lg={8}>
            <SectionCard elevation={0}>
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 1,
                  }}
                >
                  <PeopleIcon sx={{ color: "#3b82f6", fontSize: 24 }} />
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    color="text.primary"
                  >
                    Users List
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  View and manage all registered users
                </Typography>
              </Box>
              <Divider sx={{ mb: 3, opacity: 0.6 }} />
              <UsersTable
                rows={users}
                remove={deleteUser}
                selectedUser={data => {
                  console.log("Selecting user for edit:", data);
                  setIsEdit(true);
                  setSelectedUser(data);
                }}
              />
            </SectionCard>
          </Grid>
        </Grid>
      </Box>
    </StyledContainer>
  );
}
