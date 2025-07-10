import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Box,
  Typography,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
  overflow: 'hidden',
  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
  border: '1px solid rgba(226, 232, 240, 0.8)',
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
  '& .MuiTableCell-head': {
    color: '#000000',
    fontWeight: 600,
    fontSize: '0.875rem',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    padding: '20px 16px',
    borderBottom: 'none',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'rgba(248, 250, 252, 0.5)',
  },
  '&:hover': {
    backgroundColor: 'rgba(59, 130, 246, 0.04)',
    transform: 'translateY(-1px)',
    transition: 'all 0.2s ease-in-out',
  },
  '& .MuiTableCell-root': {
    padding: '16px',
    borderBottom: '1px solid rgba(226, 232, 240, 0.6)',
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 500,
  color: '#374151',
}));

const IDChip = styled(Chip)(({ theme }) => ({
  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
  color: 'white',
  fontWeight: 600,
  fontSize: '0.75rem',
  height: 28,
  minWidth: 50,
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  padding: 8,
  margin: '0 4px',
  borderRadius: 8,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
}));

const EditButton = styled(ActionButton)(({ theme }) => ({
  backgroundColor: 'rgba(34, 197, 94, 0.1)',
  color: '#22c55e',
  '&:hover': {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
  },
}));

const DeleteButton = styled(ActionButton)(({ theme }) => ({
  backgroundColor: 'rgba(239, 68, 68, 0.1)',
  color: '#ef4444',
  '&:hover': {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
  },
}));

export default function UsersTable({ rows,selectedUser,remove}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (!rows || rows.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 8,
          px: 4,
          backgroundColor: 'rgba(248, 250, 252, 0.8)',
          borderRadius: 3,
          border: '2px dashed rgba(148, 163, 184, 0.5)',
        }}
      >
        <PersonIcon sx={{ fontSize: 48, color: '#94a3b8', mb: 2 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No Users Found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Add some users to see them listed here.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <StyledTableContainer component={Paper}>
        <Table stickyHeader>
          <StyledTableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Name</TableCell>
              {!isMobile && <TableCell align="center">Email</TableCell>}
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {rows.length>0?rows.map((row, index) => (
              <StyledTableRow key={row.id || index}>
                <StyledTableCell align="center">
                  <IDChip label={`#${row.id || index + 1}`} size="small" />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="body2" fontWeight={600} color="text.primary">
                      {row.name}
                    </Typography>
                    {isMobile && (
                      <Typography variant="caption" color="text.secondary">
                        {row.email}
                      </Typography>
                    )}
                  </Box>
                </StyledTableCell>
                {!isMobile && (
                  <StyledTableCell align="center">
                    <Typography variant="body2" color="text.secondary">
                      {row.email}
                    </Typography>
                  </StyledTableCell>
                )}
                <StyledTableCell align="center">
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                    <EditButton size="small" title="Edit User" onClick={() => selectedUser({id: row._id, name:row.name, email:row.email})}>
                      <EditIcon fontSize="small" />
                    </EditButton>
                    <DeleteButton size="small" title="Delete User" onClick={() => remove(row._id)}>
                      <DeleteIcon fontSize="small" />
                    </DeleteButton>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            )):(
                <StyledTableRow>
                  <StyledTableCell colSpan={isMobile ? 3 : 4} align="center">
                    <Typography variant="body2" color="text.secondary">
                        No users available. Please add some users to see them listed here.
                    </Typography>
                  </StyledTableCell>
                </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Box>
  );
}
