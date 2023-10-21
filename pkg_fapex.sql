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
create or replace package body "PKG_FAPEX" as


procedure execute_fapex_procedures is
L_PROCESS VARCHAR2(100) := APEX_APPLICATION.G_X01;
begin
IF L_PROCESS = 'generate_url' THEN
    generate_url;
END IF;
end execute_fapex_procedures;
--==============================================================================
-- Public API, see specification
--==============================================================================
procedure generate_url
is
    -- enter the procedure code here
      L_APPLICATION VARCHAR2(100) := APEX_APPLICATION.G_X02;
      L_PAGE        VARCHAR2(100) := APEX_APPLICATION.G_X03;
      L_PLIST       VARCHAR2(4000) := APEX_APPLICATION.G_X04;
      L_PVAL       VARCHAR2(4000) := APEX_APPLICATION.G_X05;
      L_STOP        CHAR(1);
      L_ALERT_TEXT  VARCHAR2(1000);
      l_auto_action VARCHAR2(100);
      L_BASE_URL    VARCHAR2(4000);
      L_SRVR_URL    VARCHAR2(1000);
      L_OUTPUT      VARCHAR2(4000);
      L_PLAIN_URL   BOOLEAN := FALSE;
      L_RESULT      JSON_OBJECT_T;
begin
    apex_debug.enter(
        'process_emp_data' ,
        'L_APPLICATION'          , L_APPLICATION,
        'L_PAGE'          , L_PAGE,
        'L_PLIST'            , L_PLIST,
        'L_PVAL'            , L_PVAL );
      L_BASE_URL := APEX_PAGE.GET_URL(p_application => NVL(L_APPLICATION,APEX_APPLICATION.G_FLOW_ID),
                                      p_page        => L_PAGE,
                                      p_items       => L_PLIST,
                                      p_values      => L_PVAL,
                                      p_plain_url   => L_PLAIN_URL);
      L_BASE_URL := APEX_UTIL.PREPARE_URL(P_URL       => L_BASE_URL,
                                          p_plain_url => L_PLAIN_URL);
                                          
      L_OUTPUT := '{
                  "type": "' || NULL || '",
                  "url": "' || L_BASE_URL || '",
                  "success": "Y",
                  "error": ""
                }';
      RETURN_JSON(L_OUTPUT);
exception
    when others then
       L_OUTPUT := '{
                  "type": "' || NULL || '",
                  "url": "",
                  "success": "N",
                  "error": "'||SQLERRM||'"
                }';
       RETURN_JSON(L_OUTPUT);
end generate_url;

 PROCEDURE RETURN_JSON(P_JSON_OBJ   IN json_object_t,
                        P_TAG        VARCHAR2 DEFAULT NULL,
                        P_ALERT_TEXT IN VARCHAR2 DEFAULT NULL,
                        P_STOP       IN VARCHAR2 DEFAULT 'N') IS
  BEGIN
    APEX_JSON.OPEN_OBJECT;
    APEX_JSON.WRITE('tag', P_TAG);
    APEX_JSON.WRITE('status',
                    CASE WHEN P_STOP = 'Y' THEN FALSE ELSE TRUE END);
    APEX_JSON.WRITE('message', P_ALERT_TEXT);
    APEX_JSON.WRITE('data', P_JSON_OBJ.TO_STRING);
    APEX_JSON.CLOSE_OBJECT;
  END RETURN_JSON;

  PROCEDURE RETURN_JSON(P_JSON_ARR   IN json_array_t,
                        P_TAG        VARCHAR2 DEFAULT NULL,
                        P_ALERT_TEXT IN VARCHAR2 DEFAULT NULL,
                        P_STOP       IN VARCHAR2 DEFAULT 'N') IS
  BEGIN
    APEX_JSON.OPEN_OBJECT;
    APEX_JSON.WRITE('tag', P_TAG);
    APEX_JSON.WRITE('status',
                    CASE WHEN P_STOP = 'Y' THEN FALSE ELSE TRUE END);
    APEX_JSON.WRITE('message', P_ALERT_TEXT);
    APEX_JSON.WRITE('data', P_JSON_ARR.TO_STRING);
    APEX_JSON.CLOSE_OBJECT;
  END RETURN_JSON;

  PROCEDURE RETURN_JSON(P_JSON_ELE   IN json_element_t,
                        P_TAG        VARCHAR2 DEFAULT NULL,
                        P_ALERT_TEXT IN VARCHAR2 DEFAULT NULL,
                        P_STOP       IN VARCHAR2 DEFAULT 'N') IS
  BEGIN
    APEX_JSON.OPEN_OBJECT;
    APEX_JSON.WRITE('tag', P_TAG);
    APEX_JSON.WRITE('status',
                    CASE WHEN P_STOP = 'Y' THEN FALSE ELSE TRUE END);
    APEX_JSON.WRITE('message', P_ALERT_TEXT);
    APEX_JSON.WRITE('data', P_JSON_ELE.TO_STRING);
    APEX_JSON.CLOSE_OBJECT;
  END RETURN_JSON;

  FUNCTION ISO_TO_DATE(P_DATE IN VARCHAR2) RETURN DATE IS
    L_RESULT DATE;
  BEGIN
    /*
    19 YYYY-MM-DD HH:MM:SS
    16 YYYY-MM-DD HH:MM
    10 YYYY-MM-DD
    */
    RETURN CASE WHEN LENGTH(P_DATE) = 19 THEN TO_DATE(P_DATE,
                                                      'YYYY-MM-DD HH:MM:SS') WHEN LENGTH(P_DATE) = 16 THEN TO_DATE(P_DATE,
                                                                                                                   'YYYY-MM-DD HH:MM') WHEN LENGTH(P_DATE) = 10 THEN TO_DATE(P_DATE,
                                                                                                                                                                             'YYYY-MM-DD') ELSE NULL END;
  
  EXCEPTION
    WHEN OTHERS THEN
      RETURN NULL;
  END ISO_TO_DATE;

  PROCEDURE RETURN_JSON(P_STR        IN VARCHAR2,
                        P_TAG        VARCHAR2 DEFAULT NULL,
                        P_ALERT_TEXT IN VARCHAR2 DEFAULT NULL,
                        P_STOP       IN VARCHAR2 DEFAULT 'N') IS
  BEGIN
    APEX_JSON.OPEN_OBJECT;
    APEX_JSON.WRITE('tag', P_TAG);
    APEX_JSON.WRITE('status',
                    CASE WHEN P_STOP = 'Y' THEN FALSE ELSE TRUE END);
    APEX_JSON.WRITE('message', P_ALERT_TEXT);
    APEX_JSON.WRITE('data', P_STR);
    APEX_JSON.CLOSE_OBJECT;
  END RETURN_JSON;


end "PKG_FAPEX";
/
