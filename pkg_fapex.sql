create or replace package "PKG_FAPEX" as

procedure execute_fapex_procedures;
--==============================================================================
-- comments about procedure
--==============================================================================
procedure generate_url;

--==============================================================================
-- comments about function
--==============================================================================
PROCEDURE RETURN_JSON(P_JSON_OBJ   IN json_object_t,
                        P_TAG        VARCHAR2 DEFAULT NULL,
                        P_ALERT_TEXT IN VARCHAR2 DEFAULT NULL,
                        P_STOP       IN VARCHAR2 DEFAULT 'N');
  PROCEDURE RETURN_JSON(P_JSON_ARR   IN json_array_t,
                        P_TAG        VARCHAR2 DEFAULT NULL,
                        P_ALERT_TEXT IN VARCHAR2 DEFAULT NULL,
                        P_STOP       IN VARCHAR2 DEFAULT 'N');
  PROCEDURE RETURN_JSON(P_JSON_ELE   IN json_element_t,
                        P_TAG        VARCHAR2 DEFAULT NULL,
                        P_ALERT_TEXT IN VARCHAR2 DEFAULT NULL,
                        P_STOP       IN VARCHAR2 DEFAULT 'N');
  PROCEDURE RETURN_JSON(P_STR        IN VARCHAR2,
                        P_TAG        VARCHAR2 DEFAULT NULL,
                        P_ALERT_TEXT IN VARCHAR2 DEFAULT NULL,
                        P_STOP       IN VARCHAR2 DEFAULT 'N');
  FUNCTION ISO_TO_DATE(P_DATE IN VARCHAR2) RETURN DATE;

end "PKG_FAPEX";
/