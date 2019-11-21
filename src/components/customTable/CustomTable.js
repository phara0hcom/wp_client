import React from "react";
import { Link } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
}));

const CustomTable = props => {
  const classes = useStyles();

  const returnCell = (header, row) => {
    switch (header) {
      case "edit":
        return (
          <Link to={`/adminPanel/edit/${row.uid}`}>
            <Button color="default" startIcon={<EditIcon />}>
              Edit
            </Button>
          </Link>
        );
        
      default:
        return row[header];
    }
  };
  return (
    <div>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            {props.headers.map((header, indx) => (
              <StyledTableCell key={`tableHeader_${header}_${indx}`}>
                {header}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row, indx) => (
            <StyledTableRow key={`row_key_${indx}`}>
              {props.headers.map(header => (
                <StyledTableCell
                  key={`celKey_${indx}_${header}`}
                  component="th"
                  scope="row"
                >
                  {returnCell(header, row)}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomTable;
