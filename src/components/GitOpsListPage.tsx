import * as React from 'react';
import * as _ from 'lodash-es';
import Helmet from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useK8sWatchResource } from '@openshift-console/dynamic-plugin-sdk/api';

import { fetchAppGroups } from './utils/gitops-utils';
// import { fetchAppGroups, /* fetchAllAppGroups, getManifestURLs  getPipelinesBaseURI */ } from './utils/gitops-utils';
import { GitOpsAppGroupData } from './utils//gitops-types';

// import { PageHeading /*, LoadingBox */ } from '@console/internal/components/utils';
// import { useK8sWatchResource } from '@console/internal/components/utils/k8s-watch-hook';
// import { ProjectModel } from '@console/internal/models';
// import { K8sResourceKind } from '@console/internal/module/k8s';
// import { DevPreviewBadge } from '@console/shared';
// import GitOpsList from './list/GitOpsList';
// import useDefaultSecret from './utils/useDefaultSecret';
// import './GitOpsListPage.scss';

// const projectRes = { isList: true, kind: ProjectModel.kind, optional: true };
const projectRes = { isList: true, kind: "Project", optional: true };

const GitOpsListPage: React.FC = () => {
  const [appGroups, setAppGroups] = React.useState(null);
  // const [/* emptyStateMsg, */ setEmptyStateMsg] = React.useState(null);
  const [nsLoaded] = useK8sWatchResource<any[]>(projectRes);

  // const [namespaces, nsLoaded, nsError] = useK8sWatchResource<K8sResourceKind[]>(projectRes);
  // const [secretNS, secretName] = useDefaultSecret();
  // const baseURL = getPipelinesBaseURI(secretNS, secretName);
  
  // const baseURL = '/api/gitops/pipelines';
  const { t } = useTranslation();

  // React.useEffect(() => {
  //   let ignore = false;

    // const getAppGroups = async () => {
    //   // if (nsLoaded) {
    //     // const manifestURLs = (/*!nsError &&*/ getManifestURLs(namespaces)) || [];
    //     const manifestURLs = ['https://gitlab.com/keithchong/gitops5.git?ref=HEAD'];
    //     const [allAppGroups, emptyMsg] = await fetchAllAppGroups(baseURL, manifestURLs, t);
    //     // if (ignore) return;
    //     setAppGroups(allAppGroups);
    //     setEmptyStateMsg(emptyMsg);
    //   // }
    // };

    // getAppGroups();

  //   return () => {
  //     ignore = true;
  //   };
  // }, [baseURL, /* namespaces, nsError, nsLoaded, */ t]);
  React.useEffect(() => {
    let ignore = false;
    const getAppGroups = async () => {
      if (nsLoaded && !appGroups) {
        const allAppGroups = await fetchAppGroups('','');
        if (ignore) return;
        setAppGroups(_.sortBy(
          _.flatten(
              _.map(allAppGroups)
          ),
          ['name']
        ));  
      }
    };

    getAppGroups();
    return () => {
      ignore = true;
    };
  }, [/* namespaces, nsError*/ nsLoaded, t]);
  return (
    <>
      This is the list of application environments!!!!
      {_.map(appGroups, (appGroup: GitOpsAppGroupData) => appGroup && (
          <>  
          <div>
            {appGroup.name}
          </div>
          <div>
          </div>
          </>
        ),
      )}
    
      <Helmet>
        <title>{t('plugin__console-gitops-plugin~Environments')}</title>
        {/* <>{appGroups}</> */}
      </Helmet>
      {/* badge={<DevPreviewBadge} */}
      {/* <PageHeading title={t('gitops-plugin~Environments')} /> 
      { !appGroups && !emptyStateMsg ? (
        // <LoadingBox />
        <></>
      ) : (
        <>
          <PageHeading className="co-catalog-page__description">
            {t("gitops-plugin~Select an application to view the environment it's deployed in.")}
          </PageHeading>
          <GitOpsList appGroups={appGroups} emptyStateMsg={emptyStateMsg} />
        </>
      )} */}
    </>
  );
};



export default GitOpsListPage;
